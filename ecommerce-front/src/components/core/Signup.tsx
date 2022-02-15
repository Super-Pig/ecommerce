import Layout from './Layout'
import React, { useEffect } from 'react'
import { Button, Form, Input, Result } from 'antd'
import { resetSignup, signup, SignupPayload } from '../../store/actions/auth.action'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/reducers'
import { AuthState } from '../../store/reducers/auth.reducer'
import { Link } from 'react-router-dom'

function Signup() {
    // 获取 dispatch 方法
    const dispatch = useDispatch()

    const [form] = Form.useForm()

    // 获取注册结果
    const auth = useSelector<AppState, AuthState>(state => state.auth)

    const onFinish = (value: SignupPayload) => {
        dispatch(signup(value))
    }

    // 注册成功，提示成功信息
    const showSuccess = () => {
        if (auth.signup.loaded && auth.signup.success) {
            return <Result
                status="success"
                title="Register success"
                extra={[
                    <Button type="primary">
                        <Link to='/signin'>Login</Link>
                    </Button>,
                ]}
            />
        }
    }

    // 注册失败，显示失败的提示信息
    const showError = () => {
        if (auth.signup.loaded && !auth.signup.success) {
            return <Result
                status="warning"
                title="Register fail"
                subTitle={auth.signup.message}
            />
        }
    }

    const signupForm = () => {
        return <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish}
            form={form}
        >
            <Form.Item name='name' label='Nickname'>
                <Input />
            </Form.Item>
            <Form.Item name='password' label='Password'>
                <Input.Password />
            </Form.Item>
            <Form.Item name='email' label='Email'>
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                <Button type='primary' htmlType='submit'>Signup</Button>
            </Form.Item>
        </Form>
    }

    // 注册成功，清空表单
    useEffect(() => {
        if (auth.signup.loaded && auth.signup.success) {
            form.resetFields()
        }
    }, [auth])

    // 离开页面之前，重置状态
    useEffect(() => {
        return () => {
            dispatch(resetSignup())
        }
    }, [])

    return (
        <Layout title='Signup' subTitle='Register your account.'>
            {showSuccess()}
            {showError()}
            {signupForm()}
        </Layout>
    )
}

export default Signup