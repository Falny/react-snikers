import React from 'react'
import { AllContext } from '../App'


export const useCart = () => {
    const {cart} = React.useContext(AllContext)
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)
    return { totalPrice }
}
