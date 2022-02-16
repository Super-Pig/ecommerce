import { Button } from 'antd'
import React from 'react'
import { isAuth } from '../../helpers/auth'
import { Link } from 'react-router-dom'

const Pay = () => {
    const showButton = () => {
        return isAuth() ? <Button>Submit</Button> : <Button>
            <Link to='/signin'>Login</Link>
        </Button>
    }

    return (
        showButton()
    )
}

export default Pay