import React, { useEffect, FC } from 'react'
import { Typography, List, Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../store/actions/category.action'
import { AppState } from '../../store/reducers'
import { CategoryState } from '../../store/reducers/category.reducer'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'

const { Title } = Typography

interface Props {
    handleFilters: (arg: string[]) => void
}

const CheckBox: FC<Props> = ({ handleFilters }) => {
    const dispatch = useDispatch()
    const category = useSelector<AppState, CategoryState>(state => state.category)

    useEffect(() => {
        dispatch(getCategory())
    }, [])

    const onChange = (checkedValue: CheckboxValueType[]) => {
        handleFilters(checkedValue as string[])
    }

    return (
        <>
            <Title level={4}>
                Filter by Category
            </Title>

            <Checkbox.Group
                onChange={onChange}
            >
                <List dataSource={category.category.result} renderItem={item => (
                    <List.Item>
                        <Checkbox value={item._id}>
                            {item.name}
                        </Checkbox>
                    </List.Item>)} />
            </Checkbox.Group>
        </>
    )
}

export default CheckBox