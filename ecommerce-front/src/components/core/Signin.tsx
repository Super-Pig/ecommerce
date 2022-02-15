import React from 'react'
import Layout from './Layout'
import { Form, Input, Button, Result } from 'antd'
import { signin, SigninPayload } from '../../store/actions/auth.action'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/reducers'
import { AuthState } from '../../store/reducers/auth.reducer'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import { Redirect } from 'react-router-dom'

function Signin() {
    const [form] = Form.useForm()

    const dispatch = useDispatch()

    const onFinish = (value: SigninPayload) => {
        dispatch(signin(value))
    }

    // 获取登录结果
    const auth = useSelector<AppState, AuthState>(state => state.auth)

    // 登录失败，显示失败的提示信息
    const showError = () => {
        if (auth.signin.loaded && !auth.signin.success) {
            return <Result
                status="warning"
                title="Login fail"
                subTitle={auth.signin.message}
            />
        }
    }

    // 登录成功，根据角色跳转到对应的管理页面
    const redirectToDashboard = () => {
        const auth = isAuth()

        if (auth) {
            const { role } = (auth as Jwt).user

            if (role === 0) {
                // 注册用户
                return <Redirect to="/user/dashboard" />
            } else {
                // 管理员
                return <Redirect to="/admin/dashboard" />
            }
        }
    }

    const signinForm = () => {
        return <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish}
            form={form}
        >
            <Form.Item name='email' label='Email'>
                <Input />
            </Form.Item>
            <Form.Item name='password' label='Password'>
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                <Button type='primary' htmlType='submit'>Signin</Button>
            </Form.Item>
        </Form>
    }

    return (
        <Layout title='Login' subTitle=''>
            {showError()}
            {redirectToDashboard()}
            {signinForm()}
        </Layout>
    )
}

export default Signin