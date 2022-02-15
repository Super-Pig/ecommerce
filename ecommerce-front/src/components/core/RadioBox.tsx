import React, {FC} from 'react'

import { Typography, List, Radio, RadioChangeEvent } from 'antd'
import prices from '../../helpers/price'

const { Title } = Typography

interface Prop {
    handleFilter: (filters: number[])=> void
}

const RadioBox: FC<Prop> = ({handleFilter}) => {
    const onChange = (event: RadioChangeEvent) => {
        handleFilter(event.target.value)
    }

    return (
        <>
            <Title level={4}>
                Filter by Price
            </Title>

            <Radio.Group>
                <List dataSource={prices} renderItem={item => (
                    <List.Item key={item.id}>
                        <Radio value={item.array}
                            onChange={onChange}
                        >
                            {item.name}
                        </Radio>
                    </List.Item>)} />
            </Radio.Group>
        </>
    )
}

export default RadioBox