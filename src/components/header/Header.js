import React from 'react'
import './Header.scss'
import {Link} from 'react-router-dom'

import { AllContext } from '../../App'
import { useCart } from '../../hooks/useCart'

export const Header = ({onClickOpen, onClickOpenFavorite}) => {

    const {setCartOpen, cart} = React.useContext(AllContext)
    const {totalPrice} = useCart()

    return (
        <header className='header'>
            <Link to='/'>
                <div className="header-left">
                    <img src={'/images/header/logo.png'} alt="" className="logo" />
                    <div className="header-title">
                        <h3>React Snikers</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <div className="header-right">
                <div className="header-cart" onClick={onClickOpen}>
                    <img src='/images/header/cart.svg' alt='cart' className='header-icon'/>
                    <p>{totalPrice}</p>
                </div>
                <Link to='/favorite'><img src='/images/header/bookmarks.svg' alt='bookmarks' className='header-icon' onClick={onClickOpenFavorite}/></Link>
            </div>
        </header>
      );
}
