import { io, Socket } from 'socket.io-client';
import _Vue from 'vue';
import store from '../store';
import { emitSocketsEvent, onSocketsEvent } from '@/types/socketEvents';
import { MutationTypes } from '@/store/types';

const wsPlugin = {
    install(Vue: typeof _Vue) {
        let socket: Socket | null = null;
        let isAuth = false;

        Vue.prototype.$socket = {
            on(event: onSocketsEvent, callback: any): () => void {
                if (isAuth && socket) {
                    socket.on(event, callback);
                    return () => {
                        socket?.off(event, callback);
                    };
                } else {
                    throw new Error(
                        'Попытка прослушивания события websocket без авторизации'
                    );
                }
            },

            emit(event: emitSocketsEvent, data: any): void {
                if (isAuth && socket) {
                    socket.emit(event, data);
                } else {
                    throw new Error(
                        'Попытка отправить данные websocket без авторизации'
                    );
                }
            },
        };

        Vue.$__set_websocket_token = function (token: string): void {
            if (token) {
                //todo перед продом стирать uri
                socket = io('', {
                    auth: { token },
                });
                isAuth = true;

                //Глобальные слушатели
                socket.on(
                    onSocketsEvent.MESSAGE,
                    ({
                        message,
                        messageType,
                    }: {
                        message: string;
                        messageType: string;
                    }) => {
                        Vue.$toast.open({
                            message,
                            type: messageType || 'default',
                        });
                    }
                );
                socket.on(
                    onSocketsEvent.NEW_FRIEND_PUSH_TO_STORE,
                    (id: string) => {
                        store.commit(MutationTypes.PUSH_FRIENDS_LIST, id);
                    }
                );
            } else {
                socket = null;
                isAuth = false;
            }
        };

        Vue.$__close_websocket_connection = function (): void {
            if (socket) {
                socket.close();
                socket = null;
            }
        };
    },
};

_Vue.use(wsPlugin);

declare module 'vue/types/vue' {
    interface Vue {
        $socket: {
            on: (event: onSocketsEvent, callback: any) => () => void;
            emit: (event: emitSocketsEvent, data: any) => void;
            off: (event: onSocketsEvent, callback: any) => void;
        };
    }

    interface VueConstructor {
        $__set_websocket_token: (token: string) => void;
        $__close_websocket_connection: () => void;
    }
}
