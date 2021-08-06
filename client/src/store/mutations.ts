import { Mutations, MutationTypes } from './types';

export const mutations: Mutations = {
    [MutationTypes.SET_TOKEN]: (state, token) => {
        localStorage.setItem('token', token);
        state.token = token;
    },
};
