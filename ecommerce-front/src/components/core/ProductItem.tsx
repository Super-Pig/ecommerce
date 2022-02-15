import React, { FC } from 'react'
import { Button, Card, Row, Col, Image } from 'antd'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import { Product } from '../../store/models/product'
import { API } from '../../config'
import moment from 'moment'

interface Props {
    product: Product
}

export const ProductItem: FC<Props> = ({product}) => {
    return (
        <Card
            cover={
                <Image src={`${API}/product/photo/${product._id}`} alt={product.name} />
            }
            actions={[
                <Button type='link'><Link to=''>Detail</Link></Button>,
                <Button type='link'><Link to=''>Add</Link></Button>
            ]}
        >
            <Typography.Title level={5}>{product.name}</Typography.Title>
            <Typography.Paragraph ellipsis={{ rows: 2 }}>{product.description}</Typography.Paragraph>
            <Row>
                <Col span={12}>
                    {product.sold}
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    {product.price}
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    {moment(product.createdAt).format('YYYY-MM-DD HH:mm')}
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    {product.category.name}
                </Col>
            </Row>
        </Card>
    )
}