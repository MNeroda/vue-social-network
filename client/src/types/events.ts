import { Vue } from 'vue-property-decorator';

interface Clickable {
    click: () => void;
}


export interface GenericEvent<T = EventTarget> {
    target: T;
}
export type VueElementClickable = (Vue | Element | (Vue | Element)[]) & Clickable;
