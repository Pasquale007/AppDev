import * as SecureStore from 'expo-secure-store';

export async function getUUID(){
    let storedUuid = await SecureStore.getItemAsync("uuid");
    if (!storedUuid) {
        storedUuid = crypto.randomUUID();
        await SecureStore.setItemAsync("uuid", storedUuid);
    }
    return storedUuid;
}
