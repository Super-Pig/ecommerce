import React, { FC } from 'react'
import { PageHeader } from 'antd'
import Navigation from './Navigation'

interface Props {
    children: React.ReactNode,
    title: string,
    subTitle: string
}

const Layout: FC<Props> = ({ children, title, subTitle }) => {
    return (
        <div><Navigation />
            <PageHeader
                title={title}
                subTitle={subTitle}
                className='jumbotron'
            />
            <div style={{ width: '85%', margin: '0 auto' }}>
                {children}
            </div>
        </div>
    )
}

export default Layout