import { FilterProductsSuccessAction, FILTER_PRODUCT, FILTER_PRODUCT_SUCCESS, GET_PRODUCT, GET_PRODUCT_SUCCESS, ProductUnionType, SearchProductAction, SearchProductSuccessAction, SEARCH_PRODUCT, SEARCH_PRODUCT_SUCCESS } from "../actions/product.action";
import { Product } from "../models/product";

export interface ProductState {
    createdAt: {
        loaded: boolean
        success: boolean
        products: Product[]
    }
    sold: {
        loaded: boolean
        success: boolean
        products: Product[]
    },
    search: Product[],
    filter: {
        loaded: boolean
        success: boolean
        result: {
            size: number
            data: Product[]
        }
    }
}

const initialState: ProductState = {
    createdAt: {
        loaded: false,
        success: false,
        products: []
    },
    sold: {
        loaded: false,
        success: false,
        products: []
    },
    search: [],
    filter: {
        loaded: false,
        success: false,
        result: {
            size: 0,
            data: []
        }
    }
}

export default function productReducer(state: ProductState = initialState, action: ProductUnionType) {
    switch (action.type) {
        case GET_PRODUCT:
            return {
                ...state,
                [action.sortBy]: {
                    ...state[action.sortBy === 'createdAt' ? 'createdAt' : 'sold'],
                    loaded: false,
                    success: false,
                }
            }
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                [action.sortBy]: {
                    loaded: true,
                    success: true,
                    products: action.payload
                }
            }
        case SEARCH_PRODUCT_SUCCESS:
            return {
                ...state,
                search: (action as SearchProductSuccessAction).products
            }
        case FILTER_PRODUCT:
            return {
                ...state,
                filter: {
                    loaded: false,
                    success: false,
                    result: {
                        size: 0,
                        data: []
                    }
                }
            }
        case FILTER_PRODUCT_SUCCESS:
            action = action as FilterProductsSuccessAction

            let data: Product[] = []

            data = action.skip === 0 ? action.payload.data : [...state.filter.result.data, ...action.payload.data]

            return {
                ...state,
                filter: {
                    loaded: true,
                    success: true,
                    result: {
                        size: action.payload.size,
                        data
                    }
                }
            }
        default:
            return state
    }
}