import AuthService from "../helpers/auth_service";
import request from "../helpers/request";
import {
    CREATE_PRODUCT,
    CREATE_PRODUCT_DONE,
    CREATE_PRODUCT_FAILED,
    FETCH_PRODUCT,
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_DONE,
    FETCH_PRODUCTS_FAILED,
    DELETE_PRODUCT,
    FETCH_MY_PRODUCTS,
    SEARCH_PRODUCTS,
    FETCH_PRODUCTS_INFINITY,
    SEARCH_PRODUCTS_INFINITY,
    EDIT_PRODUCT,
    FETCH_MY_PRODUCTS_FAILED,
    FETCH_MY_PRODUCTS_DONE,
    FETCH_PRODUCT_FAILED,
    FETCH_PRODUCT_DONE,
    SEARCH_PRODUCTS_DONE,
    SEARCH_PRODUCTS_FAILED,
    EDIT_PRODUCT_DONE,
    EDIT_PRODUCT_FAILED,
    SEARCH_PRODUCTS_INFINITY_FAILED,
    SEARCH_PRODUCTS_INFINITY_DONE, FETCH_PRODUCTS_INFINITY_DONE, FETCH_PRODUCTS_INFINITY_FAILED,
} from "./index";

export const createProduct = (product) => async dispatch => {
    await dispatch(createProductStart());

    const userId = AuthService.getDecodedToken().sub;
    const token = AuthService.getToken();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("imageToSave", product.image);
    formData.append("protein", product.protein);
    formData.append("carbohydrate", product.carbohydrate);
    formData.append("fat", product.fat);
    formData.append("fibre", product.fibre);
    formData.append("kcal", product.kcal);

    await request.post(`/users/${userId}/products`, formData, {headers: {'Authorization': `Bearer ${token}`}})
        .then(response => dispatch(createProductDone(response)))
        .catch(error => dispatch(createProductFailed(error)));
};

export const createProductStart = () => {
    return {type: CREATE_PRODUCT};
};

export const createProductDone = (data) => {
    return {type: CREATE_PRODUCT_DONE, payload: data};
};

export const createProductFailed = (error) => {
    return {type: CREATE_PRODUCT_FAILED, payload: error};
};


export const fetchProduct = (id) => dispatch => {
    dispatch(fetchProductStart());

    request.get(`/products/${id}`)
        .then(response => dispatch(fetchProductDone(response)))
        .catch(error => dispatch(fetchProductFailed(error)));
};

export const fetchProductStart = () => {
    return {type: FETCH_PRODUCT}
};

export const fetchProductDone = (data) => {
    return {type: FETCH_PRODUCT_DONE, payload: data}
};

export const fetchProductFailed = (error) => {
    return {type: FETCH_PRODUCT_FAILED, payload: error}
};

export function deleteProduct(id, callback) {
    const token = AuthService.getToken();
    request.delete(`/products/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
        .then(() => callback());

    return {
        type: DELETE_PRODUCT,
        payload: id
    }
}

export const fetchProducts = (page, pageSize) => dispatch => {
    dispatch(fetchProductsStart());
    request.get(`/products?page=${page}&size=${pageSize}`)
        .then(response => dispatch(fetchProductsDone(response)))
        .catch(error => dispatch(fetchProductsFailed(error)));
};

export const fetchProductsStart = () => {
    return {type: FETCH_PRODUCTS};
};

export const fetchProductsDone = (data) => {
    return {
        type: FETCH_PRODUCTS_DONE,
        payload: data
    }
};

export const fetchProductsFailed = (error) => {
    return {
        type: FETCH_PRODUCTS_FAILED,
        payload: error
    }
};

export const fetchProductsInfinity = (page, pageSize) => dispatch => {
    dispatch(fetchProductsInfinityStart());
    request.get(`/products?page=${page}&size=${pageSize}`)
        .then(response => dispatch(fetchProductsInfinityDone(response)))
        .catch(error => dispatch(fetchProductsInfinityFailed(error)));
};

export const fetchProductsInfinityStart = () => {
    return {type: FETCH_PRODUCTS_INFINITY}
};

export const fetchProductsInfinityDone = (data) => {
    return {type: FETCH_PRODUCTS_INFINITY_DONE, payload: data}
};

export const fetchProductsInfinityFailed = (error) => {
    return {type: FETCH_PRODUCTS_INFINITY_FAILED, payload: error}
};

export const fetchMyProducts = (page, pageSize) => dispatch => {
    dispatch(fetchMyProductsStart());

    const userId = AuthService.getDecodedToken().sub;
    request.get(`/users/${userId}/products?page=${page}&size=${pageSize}`)
        .then(response => dispatch(fetchMyProductsDone(response)))
        .catch(error => dispatch(fetchMyProductsFailed(error)));
};

export const fetchMyProductsStart = () => {
    return {type: FETCH_MY_PRODUCTS}
};

export const fetchMyProductsDone = (data) => {
    return {type: FETCH_MY_PRODUCTS_DONE, payload: data}
};

export const fetchMyProductsFailed = (error) => {
    return {type: FETCH_MY_PRODUCTS_FAILED, payload: error}
};


export const searchProducts = (query, page, pageSize) => dispatch => {
    dispatch(searchProductsStart());

    request.get(`/products/search?query=${query}&page=${page}&size=${pageSize}`)
        .then(response => dispatch(searchProductsDone(response)))
        .catch(error => dispatch(searchProductsFailed(error)));
};

export const searchProductsStart = () => {
    return {type: SEARCH_PRODUCTS}
};

export const searchProductsDone = (data) => {
    return {type: SEARCH_PRODUCTS_DONE, payload: data}
};

export const searchProductsFailed = (error) => {
    return {type: SEARCH_PRODUCTS_FAILED, payload: error}
};


export const searchProductsInfinity = (query, page, pageSize) => dispatch => {
    dispatch(searchProductsInfinityStart());

    request.get(`/products/search?query=${query}&page=${page}&size=${pageSize}`)
        .then(response => dispatch(searchProductsInfinityDone(response)))
        .catch(error => dispatch(searchProductsInfinityFailed(error)));
};

export const searchProductsInfinityStart = () => {
    return {type: SEARCH_PRODUCTS_INFINITY}
};

export const searchProductsInfinityDone = (data) => {
    return {type: SEARCH_PRODUCTS_INFINITY_DONE, payload: data}
};

export const searchProductsInfinityFailed = (error) => {
    return {type: SEARCH_PRODUCTS_INFINITY_FAILED, payload: error}
};

export const editProduct = (productId, update) => async dispatch => {
    await dispatch(editProductStart());
    const token = AuthService.getToken();

    const formData = new FormData();
    formData.append("name", update.name);
    formData.append("description", update.description);
    if (update.image instanceof File)
        formData.append("imageToSave", update.image);
    formData.append("protein", update.protein);
    formData.append("carbohydrate", update.carbohydrate);
    formData.append("fat", update.fat);
    formData.append("fibre", update.fibre);
    formData.append("kcal", update.kcal);

    await request.put(`/products/${productId}`, formData, {headers: {'Authorization': `Bearer ${token}`}})
        .then(response => dispatch(editProductDone(response)))
        .catch(error => dispatch(editProductFailed(error)));
};

export const editProductStart = () => {
    return {type: EDIT_PRODUCT,}
};

export const editProductDone = (data) => {
    return {type: EDIT_PRODUCT_DONE, payload: data}
};

export const editProductFailed = (error) => {
    return {type: EDIT_PRODUCT_FAILED, payload: error}
};