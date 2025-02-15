import React from "react";
import './Picture.scss'
import ContentLoader from "react-content-loader"

import { AllContext } from "../../App";

export const Picture = ({id, parentId, title, img, price}) => {

    const {isFavoriteAdded, isItemAdded, onAddCart, onAddFavorite, isLoading} = React.useContext(AllContext)

    const obj = {id, parentId: id, title, img, price}
    
    const onClickFavorite = () => {
        onAddFavorite(obj)
    }

    const onClickCart = () => {
        onAddCart(obj)
    }

    return (
        <>
        <div className="picture">
            {isLoading ? <ContentLoader 
                    speed={2}
                    width={182}
                    height={225}
                    viewBox="0 0 182 225"
                    backgroundColor="#c2c2c2"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="4" ry="4" width="180" height="90" /> 
                    <rect x="0" y="105" rx="0" ry="0" width="180" height="15" /> 
                    <rect x="0" y="125" rx="2" ry="2" width="80" height="15" /> 
                    <rect x="0" y="185" rx="4" ry="4" width="80" height="25" /> 
                    <rect x="150" y="180" rx="3" ry="3" width="32" height="32" />
                </ContentLoader>  
                : 
                <>
                    <img src={`images/pictures/${isFavoriteAdded(id) ? 'likes' : 'unlikes'}.svg`} onClick={onClickFavorite} className='picture-icon picture-like' alt="Like" />
                    <img src={img} alt="Snikers" />
                    <p>{title}</p>
                    <div className="picture-info">
                        <div className="picture-info-price">
                            <p>ЦЕНА:</p>
                            <span>{price} руб.</span>
                        </div>
                        <img src={`/images/pictures/${isItemAdded(id) ? 'addCart' : 'add'}.svg`} onClick={onClickCart} alt="" className='picture-icon'/>
                    </div>
                </>
                }
            </div> 
        </>
    )
}

