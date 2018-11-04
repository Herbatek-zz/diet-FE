import Request from "../helpers/request";
import SecuredRequest from '../helpers/secured_request';
import {FETCH_USER, EDIT_USER} from "./index";
import AuthService from "../helpers/auth_service";

export function fetchUser(userId) {
    const request = Request.get(`/users/${userId}`);

    return {
        type: FETCH_USER,
        payload: request
    }
}

export function editUser(updateUser, callback) {
    const userId = AuthService.getDecodedToken().sub;
    const token = AuthService.getToken();
    const request = SecuredRequest.put(`/users/${userId}`, updateUser, {headers: {'Authorization': `Bearer ${token}`}})
        .then((response) => {
            callback();
            return response;
        });

    return {
        type: EDIT_USER,
        payload: request
    }
}