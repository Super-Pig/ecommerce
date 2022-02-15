import React, { useEffect } from 'react'
import { Form, Input, Select, Button, Divider, Row, Col } from 'antd'
import { ProductItem } from './ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../store/actions/category.action'
import { AppState } from '../../store/reducers'
import { CategoryState } from '../../store/reducers/category.reducer'
import { searchProduct } from '../../store/actions/product.action'
import { ProductState } from '../../store/reducers/product.reducer'


const Search = () => {
    const dispatch = useDispatch();

    const { category } = useSelector<AppState, CategoryState>(state => state.category)
    const { search } = useSelector<AppState, ProductState>(state => state.product)

    useEffect(() => {
        dispatch(getCategory())
    }, [])

    const onFinish = (value: { category: string; search: string }) => {
        dispatch(searchProduct(value))
    }

    return (
        <>
            <Form layout='inline' initialValues={{
                category: 'all'
            }}
                onFinish={onFinish}
            >
                <Input.Group compact>
                    <Form.Item name='category'>
                        <Select>
                            <Select.Option value='all'>All</Select.Option>
                            {
                                category.result.map(item => <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name='search'>
                        <Input placeholder='input keyword' />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit'>Search</Button>
                    </Form.Item>
                </Input.Group>
            </Form>

            <Divider />

            <Row gutter={[16, 16]}>
                {
                    search.map(item => <Col span={6}>
                        <ProductItem product={item} />
                    </Col>)
                }
            </Row>
        </>
    )
}

export default Search