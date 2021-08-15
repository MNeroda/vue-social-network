import { BaseResource } from '@/recources/BaseResource';

export class FileResource extends BaseResource {
    constructor() {
        super('/api/file-service');
    }

    getUserAvatar(id: string) {
        if (id) {
            return this.axios.get(`/user-avatar`, {
                params: { id: id },
            });
        }
    }
}
