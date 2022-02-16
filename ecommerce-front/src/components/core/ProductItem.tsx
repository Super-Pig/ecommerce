import React, { FC } from 'react'
import { Button, Card, Row, Col, Image } from 'antd'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import { Product } from '../../store/models/product'
import { API } from '../../config'
import moment from 'moment'

interface Props {
    product: Product
    showViewProduct?: boolean
    showCartButton?: boolean
}

export const ProductItem: FC<Props> = ({ product, showViewProduct = true, showCartButton = true }) => {
    const showButtons = () => {
        let buttonArray = []

        if (showViewProduct) {
            buttonArray.push(<Button type='link'><Link to={`/product/${product._id}`}>Detail</Link></Button>);
        }

        if (showCartButton) {
            buttonArray.push(<Button type='link'><Link to=''>Add</Link></Button>)
        }

        return buttonArray
    }

    return (
        <Card
            cover={
                <Image src={`${API}/product/photo/${product._id}`} alt={product.name} />
            }
            actions={showButtons()}
        >
            <Typography.Title level={5}>{product.name}</Typography.Title>
            <Typography.Paragraph ellipsis={{ rows: 2 }}>{product.description}</Typography.Paragraph>
            <Row>
                <Col span={12}>
                    sold: {product.sold}
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    price: {product.price}
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    time: {moment(product.createdAt).format('YYYY-MM-DD HH:mm')}
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    category: {product.category.name}
                </Col>
            </Row>
        </Card>
    )
}