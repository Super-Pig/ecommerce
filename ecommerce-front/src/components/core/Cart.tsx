import React, { ChangeEvent, useEffect, useState } from 'react'
import { CartItem, getCart } from '../../helpers/cart'
import Layout from './Layout'
import { Row, Col, Input, Divider } from 'antd'
import CartItemFc from './CartItemFc'
import TotalPrice from './TotalPrice'
import Pay from './Pay'

const Cart = () => {
    const [cart, setCart] = useState<CartItem[]>([])
    const [address, setAddress] = useState<string>('')
    const [totalPrice, setTotalPrice] = useState<number>(0)

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
                {cart.map(item => <CartItemFc product={item} key={item._id} setCart={setCart} />)}
            </tbody>
        </table>
    )

    return (
        <Layout title='Cart' subTitle={`I'm yours`}>
            <Row gutter={16}>
                <Col span={16}>
                    {showCart()}
                </Col>
                <Col span={8}>
                    <Row>
                        <Input placeholder='input address' value={address} onChange={(event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)} />
                    </Row>

                    <Divider />

                    <Row>
                        <TotalPrice cart={cart} setTotalPrice={setTotalPrice} />
                    </Row>

                    <Row>
                        <Pay />
                    </Row>
                </Col>
            </Row>
        </Layout>
    )
}

export default Cart