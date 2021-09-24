import { BaseResource } from '@/recources/BaseResource';
import store from '@/store';

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
        super('/api/file');
    }

    async getUserAvatar(id: string, isHaveAvatar: boolean) {
        if (id) {
            if (isHaveAvatar) {
                const ref = storage.ref(`${id}/avatar.jpg`);
                const url = await ref.getDownloadURL();
                return url;
            } else {
                const ref = storage.ref('default-avatar.png');
                const url = await ref.getDownloadURL();
                return url;
            }
        }
    }

    async uploadAvatar(file: any): Promise<void> {
        if (!store.state.userId) {
            throw new Error(
                'Попытка установить аватар у несуществуещего пользователя'
            );
        }
        const blob = file.slice(0, file.size, 'image/jpg');
        const newFile = new File([blob], 'avatar.jpg', { type: 'image/jpg' });
        storage.ref(`${store.state.userId}/avatar.jpg`).put(newFile);
        this.setUserAvatar(true);
    }

    // Этот метод просто меняет поле в mongo
    // Сама установка аватара в методе uploadAvatar
    private setUserAvatar(isHaveAvatar: boolean) {
        console.log('dc ', document.cookie);
        this.axios.get('/set-user-avatar', {
            params: {
                isHaveAvatar,
            },
        });
    }
}
