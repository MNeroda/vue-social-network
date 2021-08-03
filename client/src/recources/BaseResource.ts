import axios, { AxiosInstance } from 'axios';

export class BaseResource {
    protected axios: AxiosInstance;

    constructor(baseURL: string, withCredentials = true) {
        this.axios = axios.create({
            withCredentials,
            baseURL,
            responseType: 'json'
        });
    }
}