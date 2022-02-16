import axios from 'axios'
import React, { useEffect } from 'react'
import { API } from '../../config'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import Layout from '../core/Layout'

const Orders = () => {
    const { user, token } = isAuth() as Jwt

    async function getOrders() {
        const response = await axios.get(`${API}/order/list/${user._id}`, {
            headers: {
                'Authorization': `Bearer: ${token}`
            }
        })

        console.log(response)
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <Layout title='Orders' subTitle=''>
            Orders
        </Layout>
    )
}

export default Orders