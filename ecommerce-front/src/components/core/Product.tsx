import React, { useEffect } from 'react'
import Layout from './Layout'
import { Row, Col } from 'antd'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../../store/actions/product.action'
import { AppState } from '../../store/reducers'
import { ProductState } from '../../store/reducers/product.reducer'
import { ProductItem } from './ProductItem'

const Product = () => {
    const dispatch = useDispatch()

    const { productId } = useParams<{ productId: string }>()

    const { product } = useSelector<AppState, ProductState>(state => state.product)

    useEffect(() => {
        dispatch(getProductById({ productId }))
    }, [])

    return (
        <Layout title='Product name' subTitle='description'>
            <Row gutter={36}>
                <Col span={18}>
                    <ProductItem product={product.result} showViewProduct={false}   />
                </Col>
                <Col span={6}>
                </Col>
            </Row>
        </Layout>
    )
}

export default Product