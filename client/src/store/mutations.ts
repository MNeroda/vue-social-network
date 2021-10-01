import { Mutations, MutationTypes } from './types';

export const mutations: Mutations = {
    [MutationTypes.SET_TOKEN]: (state, token) => {
        localStorage.setItem('token', token);
        state.token = token;
    },
    [MutationTypes.SET_PREV_TOKEN_TIMEOUT]: (state, timeouts) => {
        clearTimeout(state.prevTokenTimeout);
        state.prevTokenTimeout = timeouts;
    },
    [MutationTypes.SET_USER_ID]: (state, userId) => {
        state.userId = userId;
    },
    [MutationTypes.SET_FRIENDS_LIST]: (state, friendsList) => {
        state.friendsList = friendsList;
    },
    [MutationTypes.PUSH_FRIENDS_LIST]: (state, friend) => {
        if (state.friendsList) {
            state.friendsList.push(friend);
        }
    },
};
