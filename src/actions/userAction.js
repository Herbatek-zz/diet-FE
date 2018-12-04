import request from "../helpers/request";
import {FETCH_USER, EDIT_USER} from "./index";
import AuthService from "../helpers/auth_service";

export function fetchUser(userId) {
    const requestGet = request.get(`/users/${userId}`);

    return {
        type: FETCH_USER,
        payload: requestGet
    }
}

export function editUser(updateUser, callback) {
    const userId = AuthService.getDecodedToken().sub;
    const token = AuthService.getToken();
    console.log(updateUser);
    const requestPut = request.put(`/users/${userId}`, updateUser, {headers: {'Authorization': `Bearer ${token}`}})
        .then((response) => {
            callback();
            return response;
        });

    return {
        type: EDIT_USER,
        payload: requestPut
    }
}