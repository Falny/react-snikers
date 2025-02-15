import React from "react";
import './Favorite.scss'
import { Picture } from "../picture/Picture";

import { AllContext } from "../../App";


export const Favorite = () => {

    const {favorite, onAddFavorite} = React.useContext(AllContext)

    return (
        <>
            <div className="favorite">
                <h1>Мои закладки</h1>
                {favorite.length > 0 ? <ul className="favorite-list">
                    {favorite.map(item => (
                        <li className="favorite-item" key={item.id}>
                            <Picture {...item}/>
                        </li>
                    ))}
                </ul> 
                : 
                    <div className="not-favorite">
                        У вас нет закладок
                    </div>
                }
            </div>
        </>
    )
}