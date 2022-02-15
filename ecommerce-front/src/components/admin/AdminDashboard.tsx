import React from 'react'
import Layout from '../core/Layout'
import { Row, Col, Menu, Typography, Descriptions } from 'antd'
import { Link } from 'react-router-dom'
import { ShoppingCartOutlined, UserOutlined, OrderedListOutlined } from '@ant-design/icons'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'

const { Title } = Typography

function AdminDashboard() {
    const { user: { name, email } } = isAuth() as Jwt

    const adminLinks = () => {
        return <>
            <Title level={5}>Administrator Links</Title>
            <Menu>
                <Menu.Item>
                    <ShoppingCartOutlined />
                    <Link to='/admin/create/category'>Add Category</Link>
                </Menu.Item>
                <Menu.Item>
                    <UserOutlined />
                    <Link to='/admin/create/product'>Add Product</Link>
                </Menu.Item>
                <Menu.Item>
                    <OrderedListOutlined />
                    <Link to=''>Orders</Link>
                </Menu.Item>
            </Menu>
        </>
    }

    const adminInfo = () => {
        return <Descriptions title='Admin Info' bordered>
            <Descriptions.Item label='Nickname'>{name}</Descriptions.Item>
            <Descriptions.Item label='Email'>{email}</Descriptions.Item>
            <Descriptions.Item label='Role'>admin</Descriptions.Item>
        </Descriptions>
    }

    return (
        <Layout title='Admin Dashboard'
            subTitle=''>
            <Row>
                <Col span={4}>
                    {adminLinks()}
                </Col>
                <Col span={20}>
                    {adminInfo()}
                </Col>
            </Row>
        </Layout>
    )
}

export default AdminDashboard