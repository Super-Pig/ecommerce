import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { Row, Col, Space } from 'antd'
import CheckBox from './CheckBox'
import RadioBox from './RadioBox'
import { useDispatch, useSelector } from 'react-redux'
import { filterProduct } from '../../store/actions/product.action'
import { AppState } from '../../store/reducers'
import { ProductState } from '../../store/reducers/product.reducer'
import { ProductItem } from './ProductItem'

const Shop = () => {
  const dispatch = useDispatch()

  const product = useSelector<AppState, ProductState>(state => state.product)

  const [myFilters, setMyFilters] = useState<{ category: string[], price: number[] }>({
    category: [],
    price: []
  })

  const productDOM = () => {
    console.log(product.filter)

    return <Row gutter={[16, 16]}>
      {
        product.filter.result.data.map(item => (
          <Col key={item._id} span={6}>
            <ProductItem product={item} />
          </Col>
        ))
      }
    </Row>
  }

  useEffect(() => {
    dispatch(filterProduct({
      filters: myFilters,
      skip: 0
    }))
  }, [myFilters])


  const filterDOM = () => <Space size='middle' direction='vertical'>
    <CheckBox handleFilters={(filters: string[]) => {
      setMyFilters({
        ...myFilters,
        category: filters
      })
    }} />
    <RadioBox handleFilter={(filters: number[]) => {
      setMyFilters({
        ...myFilters,
        price: filters
      })
    }} />
  </Space>

  return (
    <Layout
      title='Shopping Mall'
      subTitle='Select your favorite goods'
    >
      <Row>
        <Col span={4}>{filterDOM()}</Col>
        <Col span={20}>
          {productDOM()}
        </Col>
      </Row>
    </Layout>
  )
}

export default Shop