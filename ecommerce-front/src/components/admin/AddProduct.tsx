import React, { useEffect, useState } from 'react'
import Layout from '../core/Layout'
import { Form, Upload, Button, Input, Select, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../store/actions/category.action'
import { AppState } from '../../store/reducers'
import { CategoryState } from '../../store/reducers/category.reducer'
import { RcFile } from 'antd/lib/upload'
import axios from 'axios'
import { API } from '../../config'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'

const AddProduct = () => {
    const dispatch = useDispatch()
    const [file, setFile] = useState<RcFile>()
    const { user, token } = isAuth() as Jwt

    const category = useSelector<AppState, CategoryState>(state => state.category)

    useEffect(() => {
        dispatch(getCategory())
    }, [])

    const addProductForm = () => {
        const uploadProps = {
            beforeUpload(file: RcFile) {
                setFile(file)

                return false
            }
        }

        const onFinish = (product: any) => {
            const formData = new FormData()

            for (let attr in product) {
                formData.set(attr, product[attr])
            }

            if (typeof file !== 'undefined') {
                formData.set('photo', file)
            }

            axios.post(`${API}/product/create/${user._id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(() => { 
                message.success('product add success')
            }, () => { 
                message.error('product add fail')
            })
        }

        return <Form onFinish={onFinish}>
            <Form.Item>
                <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Upload cover of goods</Button>
                </Upload>
            </Form.Item>
            <Form.Item name='name' label='Name'>
                <Input />
            </Form.Item>
            <Form.Item name='description' label='Description'>
                <Input />
            </Form.Item>
            <Form.Item name='price' label='Price'>
                <Input />
            </Form.Item>
            <Form.Item name='category' label='Gategory'>
                <Select placeholder='select category'>
                    {
                        category.category.result.map(({ _id, name }) => (
                            <Select.Option key={_id} value={_id}>{name}</Select.Option>
                        ))
                    }
                </Select>
            </Form.Item>

            <Form.Item name='quantity' label='Quality'>
                <Input />
            </Form.Item>

            <Form.Item name='shipping' label='Need shipping'>
                <Select>
                    <Select.Option value="1">Yes</Select.Option>
                    <Select.Option value="0">No</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit'>Submit</Button>
            </Form.Item>
        </Form>
    }

    return (
        <Layout title='Add Product' subTitle=''>
            {addProductForm()}
        </Layout>
    )
}

export default AddProduct