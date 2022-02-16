import React, { useEffect, useState } from 'react'
import { CartItem, getCart } from '../../helpers/cart'
import Layout from './Layout'
import { Table, Row, Col } from 'antd'
import CartItemFc from './CartItemFc'

const Cart = () => {
    const [cart, setCart] = useState<CartItem[]>([])

    useEffect(() => {
        setCart(getCart())
    }, [])

    const showCart = () => (
        <table style={{ width: '100%' }}>
            <thead className='ant-table-thead'>
                <tr>
                    <th className='ant-table-cell'>cover</th>
                    <th className='ant-table-cell'>name</th>
                    <th className='ant-table-cell'>price</th>
                    <th className='ant-table-cell'>category</th>
                    <th className='ant-table-cell'>count</th>
                    <th className='ant-table-cell'>action</th>
                </tr>
            </thead>
            <tbody className='ant-table-tbody'>
                {cart.map(item => <CartItemFc product={item} key={item._id} />)}
            </tbody>
        </table>
    )


    return (
        <Layout title='Cart' subTitle={`I'm yours`}>
            <Row gutter={16}>
                <Col span={16}>
                    {showCart()}
                </Col>
                <Col span={8}></Col>
            </Row>
        </Layout>
    )
}

export default Cart