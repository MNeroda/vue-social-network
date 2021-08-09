import { Mutations, MutationTypes } from './types';

export const mutations: Mutations = {
    [MutationTypes.SET_TOKEN]: (state, token) => {
        localStorage.setItem('token', token)
        state.token = token;
    },
    [MutationTypes.SET_PREV_TOKEN_TIMEOUT]: (state, timeouts) => {
        clearTimeout(state.prevTokenTimeout);
        state.prevTokenTimeout = timeouts;
    },
};
