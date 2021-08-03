/* eslint-disable */
import { ActionContext, ActionTree, GetterTree } from 'vuex';

export type Actions<Bindings, State, RootState> = {
    [key in keyof Bindings]: (
        context: ActionContext<State, RootState>,
        //@ts-ignore
        ...args: Parameters<Bindings[key]>
    ) => //@ts-ignore
        ReturnType<Bindings[key]>;
} &
    ActionTree<State, RootState>;

export type Getters<Bindings, State, RootState> = {
    [key in keyof Bindings]: (
        state: State,
        getters: Bindings,
        rootState: RootState
    ) => Bindings[key];
} &
    GetterTree<State, RootState>;