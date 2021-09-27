import { io } from 'socket.io-client';
import _Vue from 'vue';
import { emitSocketsEvent, onSocketsEvent } from '@/types/socketEvents';

const wsPlugin = {
    install(Vue: typeof _Vue) {
        let socket = io('ws://localhost:8999');
        let isAuth = false;

        Vue.prototype.$socket = {
            on(event: onSocketsEvent, callback: any) {
                if (isAuth) {
                    socket.on(event, callback);
                } else {
                    throw new Error('Попытка прослушивания события websocket без авторизации')
                }
            },

            emit(event: emitSocketsEvent, data: any) {
                if (isAuth) {
                    socket.emit(event, data);
                } else {
                    throw new Error('Попытка отправить данные websocket без авторизации')
                }
            },
        };

        Vue.$__set_websocket_token = function (token: string) {
            if (token) {
                socket = io('ws://localhost:8999', {
                    auth: { token },
                });
                isAuth = true
            } else {
                socket = io('ws://localhost:8999');
                isAuth = false
            }

        };
    },
};

_Vue.use(wsPlugin);

declare module 'vue/types/vue' {
    interface Vue {
        $socket: {
            on: (event: onSocketsEvent, callback: any) => void;
            emit: (event: emitSocketsEvent, data: any) => void;
        };
    }

    interface VueConstructor {
        $__set_websocket_token: (token: string) => void;
    }
}
