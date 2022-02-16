import React, { useState, Dispatch, SetStateAction, FC } from 'react'
import { itemCount } from './helpers/cart'

interface Props {
    children: React.ReactNode
}

export const TotalContext = React.createContext<[number, Dispatch<SetStateAction<number>>]>([0, () => null])

const AnotherStore: FC<Props> = ({ children }) => {
    const [count, setCount] = useState<number>(itemCount())

    return (
        <TotalContext.Provider value={[count, setCount]}>
            {children}
        </TotalContext.Provider>
    )
}

export default AnotherStore