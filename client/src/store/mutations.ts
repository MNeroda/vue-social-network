import { Mutations, MutationTypes } from './types';

export const mutations: Mutations = {
    [MutationTypes.SET_TOKEN]: (state, token) => {
        state.token = token;
    },

    [MutationTypes.SET_USER_ID]: (state, userId) => {
        state.userId = userId;
    },

    [MutationTypes.SET_ERRORS]: (state, errors) => {
        state.errors = errors;
    },

    [MutationTypes.SET_INFO]: (state, info) => {
        state.info = info
    }
};
