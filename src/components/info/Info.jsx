import React from 'react'
import './Info.scss'

export const Info = ({title, img, description, onClickClose}) => {

  return (
    <>
        <div className="cart-info">
            <img src={img} alt="Box" />
            <div className="cart-info-empty">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <button className='btn-close' type='button' onClick={onClickClose}><img src='images/cart/arrow.svg' className='cart-arrow-back'/> Вернуться назад</button>
        </div>
    </>
  )
}
