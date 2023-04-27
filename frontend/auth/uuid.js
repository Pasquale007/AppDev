import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as SecureStore from 'expo-secure-store';

export async function getUUID(){
    let storedUuid = await SecureStore.getItemAsync("uuid");
    if (!storedUuid) {
        storedUuid = uuidv4();
        await SecureStore.setItemAsync("uuid", storedUuid);
    }
    return storedUuid;
}
