import axios from "axios";
import { ResRefreshToken } from "../interface/auth";
import { Response } from "../interface/common";

export const getLocalToken = () => {
    const token = window.localStorage.getItem('accessToken')
    return token
};

export const getLocalRefreshToken = () => {
    const token = window.localStorage.getItem('refreshToken')
    return token
};

const client = axios.create({
    baseURL: 'http://localhost:1000/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization' : getLocalToken()
    }
});

export const setToken = (accessToken: string, refreshToken?: string) => {
    client.defaults.headers['Authorization'] ='Bearer ' + accessToken
    accessToken && window.localStorage.setItem('accessToken', 'Bearer ' + accessToken)
    refreshToken && window.localStorage.setItem('refreshToken', 'Bearer ' + refreshToken)
};

export const destroyToken = () => {
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('refreshToken')
}

export const refreshToke = (): Promise<Response<ResRefreshToken>> => {
    return client.get('/auth/getaccesstoken', {
        headers: {
            'Authorization': getLocalRefreshToken() // headers token
        }
    })
};

client.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
});

client.interceptors.response.use(async (response) => {
    
    const code = response.data?.data?.statusCode

    if (code === 401) {

        const send = await refreshToke()

        const codeRefreshToke = response.data.data.statusCode

        if (codeRefreshToke === 403) { // send refreshToken loi
            return destroyToken() 
        };

        const { accessToken, refreshToken } = send.payload
        setToken(accessToken, refreshToken)
        const config = response.config
        config.headers['Authorization'] = 'Bearer ' + accessToken
        return client(config)

    };

    if (code === 403) { // send accessToken loi
        
         destroyToken()
         return window.location.href = '/'
    };

    const checkSignin = code === 201 //check code signin
    if (checkSignin) {
        const { accessToken, refreshToken } = response.data.data
        setToken(accessToken, refreshToken)
        client.defaults.headers['Authorization'] = 'Bearer' + accessToken
    }


    return {
        payload: response.data?.data,
        status: response.status
    };
}, error => {
    // console.log(error.response);
    return Promise.reject(error.response)
});

export default client;
