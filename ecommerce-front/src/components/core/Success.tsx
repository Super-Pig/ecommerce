import React from 'react'
import Layout from './Layout'
import { Button } from 'antd' 
import { Link } from 'react-router-dom' 

const Success = () => {
    return (
        <Layout title='Pay Success' subTitle=''>
            <Button>
                <Link to='/'>Continue buy</Link>
            </Button>
        </Layout>
    )
}

export default Success