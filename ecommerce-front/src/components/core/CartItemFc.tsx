import React, { FC } from 'react'
import { CartItem } from '../../helpers/cart'
import { Image, Button, Input } from 'antd'
import { API } from '../../config'

interface Props {
    product: CartItem
}

const CartItemFc: FC<Props> = ({ product }) => {
    return (
        <tr className='ant-table-row'>
            <td className='ant-table-cell'><Image src={`${API}/product/photo/${product._id}`} /></td>
            <td className='ant-table-cell'>{product.name}</td>
            <td className='ant-table-cell'>{product.price}</td>
            <td className='ant-table-cell'>{product.category.name}</td>
            <td className='ant-table-cell'>
                <Input type='number' value={product.count}></Input>
            </td>
            <td className='ant-table-cell'>
                <Button danger type='primary'>Delete</Button>
            </td>
        </tr>
    )
}

export default CartItemFc