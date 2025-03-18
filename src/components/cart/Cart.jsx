import React from 'react'
import './Cart.scss'
import { Info } from '../info/Info';
import { X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

import axios from 'axios';

import { AllContext } from '../../App'

const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms))

export const Cart = ({opened, onClickClose}) => {

    const {cart, setCart, cartOpen} = React.useContext(AllContext)
    const [isOrderCompleted, setIsOrderCompleted] = React.useState(false)
    const { totalPrice } = useCart()

    React.useEffect(() => {
        if (cartOpen) {
        // document.body.style.paddingRight = '18px'
        document.body.style.overflowY = 'hidden'
        } else {
            // document.body.style.paddingRight = '0'
            document.body.style.overflowY = 'scroll'
        }
    }, [cartOpen])

    const onClickOrder = async () => {
        try {
            setIsOrderCompleted(true)
            for (let i = 0; i < cart.length; i++) {
                const item = cart[i]
                await axios.delete('https://67a9e3a165ab088ea7e4d985.mockapi.io/cart/' + item.id)
                await delay(1000)
            }
            setCart([])
        } catch {
            alert('Не удалось оформить заказ :(')
        }
    }

    const onClickDelete = (id) => {
        axios.delete(`https://67a9e3a165ab088ea7e4d985.mockapi.io/cart/${id}`)
        return setCart(cart => cart.filter(item => Number(item.id) !== Number(id)))
    }

    return (
        <>
            <div className={`cart-shadow ${opened && 'active'}`}>
                <div className={`cart ${cart.length > 0 ? 'cart-content-df' : ''} ${opened && 'cart-active'}`}>
                    
                        <div className="cart-head">
                            <h2>Корзина</h2>
                            {cart.length > 0 ? <button type="button" onClick={onClickClose}><X /></button> : ''}
                        </div>

                        {cart.length > 0 && (<div className="cart-content ">
                        
                            <ul className="cart-list" >
                                {cart.map((item) => (
                                    <li className="cart-item" key={item.id}>
                                        <div className="item-content">
                                            <img src={item.img} alt="" />
                                            <div className="item-info">
                                                <p>{item.title}</p>
                                                <span>{item.price} руб.</span>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => onClickDelete(item.id)}><X /></button>
                                    </li>
                                ))}
                            </ul>

                            <div className='cart-footer'>
                                <div className="cart-footer-common cart-total">
                                    <p>Итого:</p>
                                    <div></div>
                                    <span>{totalPrice} руб.</span>
                                </div>
                                <div className="cart-footer-common cart-tax">
                                    <p>Налог 5%:</p>
                                    <div></div>
                                    <span>{(totalPrice * 5)/100} руб.</span>
                                </div>
                                <button onClick={onClickOrder} className='btn-close' type='button'>Оформить заказ <img src='images/cart/arrow-right.svg' alt='arrow' /></button>
                        </div>
                    </div>
                    )}

                    {cart.length <= 0 && <Info 
                    title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая' }
                    img={isOrderCompleted ? '/images/cart/order.png' : '/images/cart/box.png'} 
                    description={isOrderCompleted ? 'Ваш заказ #18 скоро будет передан курьерской доставке' : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'} 
                    onClickClose={onClickClose}/>}
                        
                </div>
            </div>
        </>
    )
}