import Search from './Search'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from './Layout'
import { Row, Col, Typography } from 'antd'
import { getProduct } from '../../store/actions/product.action'
import { AppState } from '../../store/reducers'
import { ProductState } from '../../store/reducers/product.reducer'
import { ProductItem } from './ProductItem'

const Home = () => {
  const dispatch = useDispatch()

  const { createdAt, sold } = useSelector<AppState, ProductState>(state => state.product)

  useEffect(() => {
    dispatch(getProduct('createdAt'))
    dispatch(getProduct('sold'))
  }, [])

  return (
    <Layout
      title='Shopping Mall'
      subTitle='Enjoy it!'
    >
      <Search />
      <Typography.Title level={5}>Latest</Typography.Title>
      <Row>
        {
          createdAt.products.map((item) => (
            <Col span={6} key={item._id}>
              <ProductItem product={item} />
            </Col>
          ))
        }
      </Row>
      <Typography.Title level={5}>Favorites</Typography.Title>
      <Row>
        {
          sold.products.map((item) => (
            <Col span={6} key={item._id}>
              <ProductItem product={item} />
            </Col>
          ))
        }
      </Row>
    </Layout>
  )
}

export default Home
