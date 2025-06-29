import { account, BUCKET_ID, storage } from '@/database/appwrite';
import * as ImagePicker from 'expo-image-picker';
import { ID } from 'react-native-appwrite';

type TNativeFile = {
    name: string,
    type: string,
    size: number,
    uri: string
}



async function prepareNativeFile(asset: ImagePicker.ImagePickerAsset): Promise<TNativeFile> {
    console.log('[modal: prepareNativeFile]', asset)
    try {
        const url = new URL(asset.uri);
        return {
            name: url.pathname.split('/').pop()!,
            type: asset.mimeType!,
            size: asset.fileSize!,
            uri: url.href,
        }
    } catch (error) {
        console.error('[modal: prepareNativeFile] error', error)
        throw error;
    }
}
export async function uploadImageAsync(asset: ImagePicker.ImagePickerAsset) {
    try {
        const response = await storage.createFile(
            BUCKET_ID,
            ID.unique(),
            await prepareNativeFile(asset)
        )

        console.log('[modal: file uploaded]', response)

        const imageUrl = storage.getFileView(BUCKET_ID!, response.$id);

        await account.updatePrefs({ photo: imageUrl });

        console.log('[modal: imageUrl]', imageUrl)

        return imageUrl

    } catch (error) {
        console.error('[Modal - uploadImageAsync]: Erro ao enviar imagem:', error);
    }
}