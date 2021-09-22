import axios, { AxiosInstance } from 'axios';
import Vue from 'vue';

export class BaseResource {
    protected axios: AxiosInstance;

    constructor(baseURL: string, withCredentials = true) {
        this.axios = axios.create({
            withCredentials,
            baseURL,
            responseType: 'json',
        });

        /*Плагин сообщений с сервера*/
        this.axios.interceptors.response.use(
            function (response) {
                if (response.data.message) {
                    Vue.$toast.open({
                        message: response.data.message,
                        type: response.data.messageType || 'default',
                    });
                }
                return response;
            },
            function (error) {
                if (error.response.data.message) {
                    Vue.$toast.open({
                        message: error.response.data.message,
                        type: error.response.data.messageType || 'default',
                    });
                }
                return Promise.reject(error);
            }
        );
    }
}
