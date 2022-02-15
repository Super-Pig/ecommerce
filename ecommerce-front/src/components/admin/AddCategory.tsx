import React, { useEffect, useState } from 'react'
import Layout from '../core/Layout'
import { Form, Input, Button, message } from 'antd'
import axios, { AxiosError } from 'axios'
import { API } from '../../config'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import { Link } from 'react-router-dom'

const AddCategory = () => {
    const { user: { _id }, token } = isAuth() as Jwt

    const [name, setName] = useState<string>('')

    const onFinish = (value: { name: string }) => {
        setName(value.name)
    }

    useEffect(() => {
        async function addCategory() {
            try {
                const response = await axios.post<{ name: string }>(`${API}/category/create/${_id}`, {
                    name
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                message.success(`[${response.data.name}] category add success`)
            } catch (error) {
                message.error((error as AxiosError).response!.data.error)
            }
        }

        name && addCategory()
    }, [name])

    return (
        <Layout title='Add Category' subTitle=''>
            <Form
                onFinish={onFinish}
            >
                <Form.Item name='name' label='Category name'>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Add Category</Button>
                </Form.Item>
            </Form>
            <Button>
                <Link to='/admin/dashboard'>Return to dashboard</Link>
            </Button>
        </Layout>
    )
}

export default AddCategory