import _ from 'lodash';

import {
    CREATE_PRODUCT,
    CREATE_PRODUCT_DONE,
    CREATE_PRODUCT_FAILED,
    FETCH_PRODUCT,
    DELETE_PRODUCT,
    FETCH_PRODUCTS,
    FETCH_PRODUCTS_DONE,
    FETCH_PRODUCTS_FAILED,
    FETCH_MY_PRODUCTS,
    SEARCH_PRODUCTS,
    FETCH_PRODUCTS_INFINITY,
    SEARCH_PRODUCTS_INFINITY,
    FETCH_MY_PRODUCTS_DONE,
    FETCH_MY_PRODUCTS_FAILED,
    FETCH_PRODUCT_DONE,
    FETCH_PRODUCT_FAILED,
    SEARCH_PRODUCTS_FAILED,
    SEARCH_PRODUCTS_DONE,
    EDIT_PRODUCT,
    EDIT_PRODUCT_DONE,
    EDIT_PRODUCT_FAILED,
    FETCH_PRODUCTS_INFINITY_DONE, FETCH_PRODUCTS_INFINITY_FAILED, SEARCH_PRODUCTS_INFINITY_DONE, SEARCH_PRODUCTS_INFINITY_FAILED
} from "../actions";


export default (state = {allProducts: {list: {}}, myProducts: {list: {}}, created: {}, selectedProduct: {}}, action) => {
    switch (action.type) {

        case CREATE_PRODUCT: {
            return {
                ...state,
                created: {isLoading: true, isError: false}
            }
        }

        case CREATE_PRODUCT_DONE: {
            return {
                ...state,
                created: {...action.payload.data, isLoading: false, isError: false}
            }
        }

        case CREATE_PRODUCT_FAILED: {
            return {
                ...state,
                created: {isLoading: false, isError: true}
            }
        }

        case FETCH_PRODUCTS: {
            return {
                ...state,
                allProducts: {isLoading: true, isError: false, list: {}}
            }
        }

        case FETCH_PRODUCTS_DONE: {
            return {
                ...state,
                allProducts: {
                    list: _.mapKeys(action.payload.data.content, 'id'),
                    currentPage: action.payload.data.pageNumber,
                    pageSize: action.payload.data.pageSize,
                    totalElements: action.payload.data.totalElements,
                    last: action.payload.data.last,
                    isLoading: false,
                    isError: false
                }
            }
        }

        case FETCH_PRODUCTS_FAILED: {
            return {
                ...state,
                allProducts: {isLoading: false, isError: true, list: {}}
            }
        }

        case DELETE_PRODUCT:
            return {
                ...state.products,
                content: _.omit(state.products.content, action.payload)
            };

        case FETCH_PRODUCTS_INFINITY:
            return {
                ...state,
                allProducts: {
                    ...state.allProducts,
                    isLoading: true,
                    isError: false
                }
            };

        case FETCH_PRODUCTS_INFINITY_DONE:
            return {
                ...state,
                allProducts: {
                    list: {...state.allProducts.list, ...(_.mapKeys(action.payload.data.content, 'id'))},
                    currentPage: action.payload.data.pageNumber,
                    pageSize: action.payload.data.pageSize,
                    totalElements: action.payload.data.totalElements,
                    last: action.payload.data.last,
                    isLoading: false,
                    isError: false
                }
            };

        case FETCH_PRODUCTS_INFINITY_FAILED:
            return {
                ...state,
                allProducts: {
                    ...state.allProducts,
                    isLoading: false,
                    isError: true
                }
            };

        case FETCH_MY_PRODUCTS:
            return {...state, myProducts: {list: {}, isLoading: true, isError: false}};

        case FETCH_MY_PRODUCTS_DONE:
            return {
                ...state,
                myProducts: {
                    list: _.mapKeys(action.payload.data.content, 'id'),
                    currentPage: action.payload.data.pageNumber,
                    pageSize: action.payload.data.pageSize,
                    totalElements: action.payload.data.totalElements,
                    last: action.payload.data.last,
                    isLoading: false,
                    isError: false
                }
            };

        case FETCH_MY_PRODUCTS_FAILED:
            return {...state, myProducts: {list: {}, isLoading: false, isError: true}};

        case FETCH_PRODUCT:
            return {
                ...state,
                selectedProduct: {isLoading: true, isError: false}
            };

        case FETCH_PRODUCT_DONE:
            return {
                ...state,
                selectedProduct: {isLoading: false, isError: false, ...action.payload.data}
            };

        case FETCH_PRODUCT_FAILED:
            return {
                ...state,
                selectedProduct: {isLoading: false, isError: true}
            };

        case SEARCH_PRODUCTS: {
            return {
                ...state,
                allProducts: {list: {}, isLoading: true, isError: false}
            }
        }

        case SEARCH_PRODUCTS_DONE: {
            return {
                ...state,
                allProducts: {
                    list: _.mapKeys(action.payload.data.content, 'id'),
                    currentPage: action.payload.data.pageNumber,
                    pageSize: action.payload.data.pageSize,
                    totalElements: action.payload.data.totalElements,
                    last: action.payload.data.last,
                    isLoading: false,
                    isError: false
                }
            }
        }

        case SEARCH_PRODUCTS_FAILED: {
            return {
                ...state,
                allProducts: {list: {}, isLoading: false, isError: true}
            }
        }

        case SEARCH_PRODUCTS_INFINITY:
            return {
                ...state,
                allProducts: {
                    ...state.allProducts,
                    isLoading: true,
                    isError: false
                }
            };

        case SEARCH_PRODUCTS_INFINITY_DONE:
            return {
                ...state,
                allProducts: {
                    list: {...state.allProducts.list, ...(_.mapKeys(action.payload.data.content, 'id'))},
                    currentPage: action.payload.data.pageNumber,
                    pageSize: action.payload.data.pageSize,
                    totalElements: action.payload.data.totalElements,
                    last: action.payload.data.last,
                    isLoading: false,
                    isError: false
                }
            };

        case SEARCH_PRODUCTS_INFINITY_FAILED:
            return {
                ...state,
                allProducts: {
                    ...state.allProducts,
                    isLoading: false,
                    isError: true
                }
            };

        case EDIT_PRODUCT: {
            return {...state, selectedProduct: {isLoading: true, isError: false}};
        }
        case EDIT_PRODUCT_DONE: {
            return {
                ...state,
                selectedProduct: {isLoading: false, isError: false, ...action.payload.data}
            };
        }
        case EDIT_PRODUCT_FAILED: {
            return {...state, selectedProduct: {isLoading: false, isError: true}};
        }

        default:
            return state;
    }
}