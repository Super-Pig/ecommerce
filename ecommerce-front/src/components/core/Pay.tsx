import { Button } from 'antd'
import React, { FC } from 'react'
import { isAuth } from '../../helpers/auth'
import { Link } from 'react-router-dom'
import { CartItem } from '../../helpers/cart'
import axios from 'axios'
import { API } from '../../config'
import { Jwt } from '../../store/models/auth'

interface Props {
    totalPrice: number
    address: string
    cart: CartItem[]
}

const Pay: FC<Props> = ({ totalPrice, address, cart }) => {
    const getPayUrl = () => {
        axios.post(`${API}/alipay`, {
            totalAmount: totalPrice,
            subject: 'test order title',
            body: 'test order desc',
            products: cart.map(product => ({
                count: product.count,
                product: product._id
            })),
            address,
            userId: (isAuth() as Jwt).user._id
        }).then(response => {
            window.location.href = response.data.result
        })
    }

    const showButton = () => {
        return isAuth() ? <Button onClick={getPayUrl}>Submit</Button> : <Button>
            <Link to='/signin'>Login</Link>
        </Button>
    }

    return (
        showButton()
    )
}

export default Pay