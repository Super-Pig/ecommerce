import React, { useContext, useEffect } from 'react'
import { Badge, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/reducers'
import { RouterState } from 'connected-react-router'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import { itemCount } from '../../helpers/cart'
import { TotalContext } from '../../anotherStore'

function useActive(currentPath: string, path: string): string {
    return currentPath === path ? 'ant-menu-item-selected' : ''
}

const Navigation = () => {
    const router = useSelector<AppState, RouterState>(state => state.router)

    const { pathname } = router.location
    const auth = isAuth()

    const isHome = useActive(pathname, '/')
    const isShop = useActive(pathname, '/shop')
    const isCart = useActive(pathname, '/cart')
    const isSignin = useActive(pathname, '/signin')
    const isSignup = useActive(pathname, '/signup')
    const isDashboard = useActive(pathname, getDashboardUrl())

    const [count, setCount] = useContext(TotalContext)

    useEffect(() => { 
        setCount(itemCount())
     })

    function getDashboardUrl(): string {
        let url = '/user/dashboard'

        if (auth) {
            const { user: { role } } = auth as Jwt

            if (role === 1) {
                url = '/admin/dashboard'
            }
        }

        return url
    }

    return (
        <Menu mode='horizontal' selectable={false}>
            <Menu.Item className={isHome}>
                <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item className={isShop}>
                <Link to='/shop'>Shop</Link>
            </Menu.Item>
            <Menu.Item className={isCart}>
                <Link to='/cart'>Cart
                    <Badge count={count} offset={[5, -10]} />
                </Link>
            </Menu.Item>
            {
                !auth && <>
                    <Menu.Item className={isSignin}>
                        <Link to='/signin'>Login</Link>
                    </Menu.Item>
                    <Menu.Item className={isSignup}>
                        <Link to='/signup'>Signup</Link>
                    </Menu.Item></>
            }
            {
                auth && <Menu.Item className={isDashboard}>
                    <Link to={getDashboardUrl()}>Dashboard</Link>
                </Menu.Item>
            }
        </Menu>
    )
}

export default Navigation