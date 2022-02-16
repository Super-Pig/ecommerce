import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { Row, Col, Space, Button, Empty } from 'antd'
import CheckBox from './CheckBox'
import RadioBox from './RadioBox'
import { useDispatch, useSelector } from 'react-redux'
import { filterProduct } from '../../store/actions/product.action'
import { AppState } from '../../store/reducers'
import { ProductState } from '../../store/reducers/product.reducer'
import { ProductItem } from './ProductItem'

const Shop = () => {
  const dispatch = useDispatch()
  const [skip, setSkip] = useState<number>(0)

  const product = useSelector<AppState, ProductState>(state => state.product)

  const [myFilters, setMyFilters] = useState<{ category: string[], price: number[] }>({
    category: [],
    price: []
  })

  useEffect(()=> {
    setSkip(0)
  }, [myFilters])

  useEffect(() => {
    dispatch(filterProduct({
      filters: myFilters,
      skip
    }))
  }, [myFilters, skip])

  const productDOM = () => {
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

  const loadMore = () => {
    setSkip(skip + 4)
  }

  const loadMoreButton = () => {
    return <Row>
      {product.filter.result.size >= 4 && <Button onClick={loadMore}>More</Button>}
    </Row>
  }

  const noData = () => {
    console.log(product.filter.result.size)

    return <Row>
      {product.filter.result.size === 0 && <Empty />}
    </Row>
  }


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

          {loadMoreButton()}

          {noData()}
        </Col>
      </Row>
    </Layout>
  )
}

export default Shop