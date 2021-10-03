import { removeSocketListenersType } from '@/types/socketEvents';

export function unsubscribeSocket(removeSocketListeners: removeSocketListenersType) {
    for (const key in removeSocketListeners) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        removeSocketListeners[key]()
    }
}