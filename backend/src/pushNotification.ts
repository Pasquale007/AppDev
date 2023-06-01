import { Expo, ExpoPushToken } from 'expo-server-sdk';
import { Alert } from './parseAlerts';

const expo = new Expo();

type Response = {
    successfull: boolean,
    message: string,
    error?: string
}

type ExpoPushMessage = {
    to: string;
    sound?: "default" | { critical?: boolean; name?: "default" | null; volume?: number } | null;
    title?: string;
    subtitle?: string;
    body?: string;
    data?: Record<string, unknown>;
    ttl?: number;
    expiration?: number;
    priority?: "default" | "normal" | "high";
    badge?: number;
    channelId?: string;
    notificationId?: string;
    groupId?: string;
    vibrate?: number[] | null;
    actions?: any[];
    picture?: string;
    [key: string]: any;
}

export default async function sendNotification(alert: Alert): Promise<Response> {

    if (!Expo.isExpoPushToken(alert.id)) {
        return {
            successfull: false,
            message: `Push token ${alert.id} is not a valid Expo push token`
        };
    }

    const message: ExpoPushMessage = {
        to: alert.id,
        sound: 'default',
        title: 'Es gibt neue Flüge für dich von ' + alert.origin,
        body: 'Ein neuer Flug unter ' + alert.maxPrice + '€ wartet auf dich!',
        data: { data: alert },
    }

    //Send message
    try {
        const response = await expo.sendPushNotificationsAsync([message]);
        console.log(response);
        return {
            successfull: true,
            message: `Message was send successful`
        };
    } catch (error: any) {
        console.error(error);
        return {
            successfull: true,
            message: `An error occured`,
            error: error.message

        };
    }
}