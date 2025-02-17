import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    MODIFY_USER,
    DROP_USER,
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

// 회원정보 수정
export function modifyUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/modify`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: MODIFY_USER,
        payload: request
    }
}

// 회원 탈퇴
export function dropUser(dataToSubmit){
    const request = axios.delete(`${USER_SERVER}/drop`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: DROP_USER,
        payload: request
    }
}