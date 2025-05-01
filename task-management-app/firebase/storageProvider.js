import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FirebaseStorage } from './firebaseConfig';

export const uploadTaskPhotoStorage = async (uri, taskID) => {
    try {
        const taskPhotoRef = ref(FirebaseStorage, `task-photo/${taskID}`);

        const response = await fetch(uri);
        const blob = await response.blob();
    
        await uploadBytes(taskPhotoRef, blob);
    
        const photoUrl = await getDownloadURL(taskPhotoRef);
        
        return {
            ok: true,
            photoUrl
        };

    } catch (error) {
        const errorMessage = error.message;
		console.error('Error adding tasks from DB:', errorMessage);
		return {
			ok: false,
			errorMessage,
		};
    }
};
