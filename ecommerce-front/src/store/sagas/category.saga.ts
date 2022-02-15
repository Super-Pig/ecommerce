import axios, { AxiosResponse } from "axios";
import { put, takeEvery } from "redux-saga/effects";
import { API } from "../../config";
import { getCategorySuccess, GET_CATEGORY } from "../actions/category.action";
import { Category } from '../models/category'

function* handleGetCategory() {
    let response: AxiosResponse = yield axios.get<Category[]>(`${API}/categories`)

    yield put(getCategorySuccess(response.data))
}

export default function* categorySaga() {
    yield takeEvery(GET_CATEGORY, handleGetCategory)
}