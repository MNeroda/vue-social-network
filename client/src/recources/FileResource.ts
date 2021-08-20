import { BaseResource } from '@/recources/BaseResource';

import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBQnBO4J-sFFjgzdx_JQJyxR-C7R7_IJCc',
    authDomain: 'vue-social-network-images.firebaseapp.com',
    projectId: 'vue-social-network-images',
    storageBucket: 'vue-social-network-images.appspot.com',
    messagingSenderId: '782802673926',
    appId: '1:782802673926:web:c69056d8d67db64951fe87',
};
firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const storage = firebase.storage();

export class FileResource extends BaseResource {
    constructor() {
        super('/api/file-service');
    }

    async getUserAvatar(id: string) {
        if (id) {
            try {
                const ref = storage.ref(`${id}/avatar.jpg`);
                const url = await ref.getDownloadURL();
                return url;
            } catch (e) {
                const ref = storage.ref('default-avatar.png')
                const url = await ref.getDownloadURL()
                return url
            }
        }
    }

    async uploadAvatar(file: any, userId: string): Promise<void> {
        const blob = file.slice(0, file.size, 'image/jpg')
        const newFile = new File([blob], 'avatar.jpg', {type: 'image/jpg'})
        console.log(newFile);
        await storage.ref(`${userId}/avatar.jpg`).put(newFile);
    }
}
