import Request from '../helpers/request';
import AuthService from "../helpers/auth_service";

export const CREATE_PRODUCT = 'create_product';
export const FETCH_PRODUCT = 'fetch_product';
export const FETCH_PRODUCTS = 'fetch_products';

export function createProduct(values, callback) {
    const userId = AuthService.getDecodedToken().sub;
    const request = Request.post(`/users/${userId}/products`, values)
        .then(() => callback());

    return {
        type: CREATE_PRODUCT,
        payload: request
    };
}

export function fetchProduct(id) {
    const request = Request.get(`/products/${id}`);

    return {
        type: FETCH_PRODUCT,
        payload: request
    };
}

export function fetchProducts(page) {
    const request = Request.get(`/products?page=${page}`);

    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}

