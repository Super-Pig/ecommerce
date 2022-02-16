import { Product } from "../models/product"

export const GET_PRODUCT = 'GET_PRODUCT'
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS'
export const SEARCH_PRODUCT = 'SEARCH_PRODUCT'
export const SEARCH_PRODUCT_SUCCESS = 'SEARCH_PRODUCT_SUCCESS'
export const FILTER_PRODUCT = 'FILTER_PRODUCT'
export const FILTER_PRODUCT_SUCCESS = 'FILTER_PRODUCT_SUCCESS'
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'
export const GET_PRODUCT_BY_ID_SUCCESS = 'GET_PRODUCT_BY_ID_SUCCESS'

export interface FilterPayload {
    order?: string
    limit?: number
    sortBy?: string
    skip: number
    filters?: {
        category: string[]
        price: number[]
    }
}

export interface GetProductAction {
    type: typeof GET_PRODUCT
    sortBy: string
    order: string
    limit: number
}

export interface GetProductSuccessAction {
    type: typeof GET_PRODUCT_SUCCESS
    payload: Product[]
    sortBy: string
}

export interface SearchProductAction {
    type: typeof SEARCH_PRODUCT
    payload: {
        category: string
        search: string
    }
}

export interface SearchProductSuccessAction {
    type: typeof SEARCH_PRODUCT_SUCCESS
    products: Product[]
}

export interface FilterProductsAction {
    type: typeof FILTER_PRODUCT
    payload: FilterPayload
}

export interface FilterProductsSuccessAction {
    type: typeof FILTER_PRODUCT_SUCCESS,
    payload: {
        size: number
        data: Product[]
    }
    skip: number
}

export interface GetProductByIdAction {
    type: typeof GET_PRODUCT_BY_ID,
    payload: {
        productId: string
    }
}

export interface GetProductByIdSuccessAction {
    type: typeof GET_PRODUCT_BY_ID_SUCCESS,
    payload: Product
}

export const getProduct = (sortBy: string,
    order: string = 'desc',
    limit: number = 5): GetProductAction => ({
        type: GET_PRODUCT,
        sortBy,
        order,
        limit
    })

export const getProductSuccess = (payload: Product[], sortBy: string): GetProductSuccessAction => ({
    type: GET_PRODUCT_SUCCESS,
    payload,
    sortBy
})

export const searchProduct = (payload: {
    category: string
    search: string
}): SearchProductAction => ({
    type: SEARCH_PRODUCT,
    payload
})

export const searchProductSuccess = (products: Product[]): SearchProductSuccessAction => ({
    type: SEARCH_PRODUCT_SUCCESS,
    products
})

export const filterProduct = (payload: FilterPayload): FilterProductsAction => ({
    type: FILTER_PRODUCT,
    payload
})

export const filterProductSuccess = (payload: {
    size: number
    data: Product[]
}, skip: number): FilterProductsSuccessAction => ({
    type: FILTER_PRODUCT_SUCCESS,
    payload,
    skip
})

export const getProductById = (payload: {
    productId: string
}): GetProductByIdAction => ({
    type: GET_PRODUCT_BY_ID,
    payload
})

export const getProductByIdSuccess = (payload: Product): GetProductByIdSuccessAction => ({
    type: GET_PRODUCT_BY_ID_SUCCESS,
    payload
})

export type ProductUnionType =
    GetProductAction
    | GetProductSuccessAction
    | SearchProductAction
    | SearchProductSuccessAction
    | FilterProductsAction
    | FilterProductsSuccessAction
    | GetProductByIdAction
    | GetProductByIdSuccessAction