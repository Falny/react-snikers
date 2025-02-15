import React from "react";
import './Snikers.scss'
import { Picture } from "../picture/Picture";
import { Search } from 'lucide-react';
import { X } from 'lucide-react';

import { AllContext } from "../../App";


export const Snikers = () => {

    const [value, setValue] = React.useState('')
    const { cartItems, isLoading } = React.useContext(AllContext)

    const renderItems = () => {
        const filterItems = cartItems.filter(item => item.title.toLowerCase().includes(value.toLowerCase()))

        return (isLoading ? [...Array(8)] : filterItems).map((item, index) => (
            <li key={index} className="picture-item">
               <Picture 
                isLoading={isLoading}
                {...item}/> 
            </li>
        ))
    }

    return (
        <>
            <div className="container">
                <div className="snikers">
                    <div className="snikers-head">
                        <h1>{value ? `Поиск по запросу: '${value}'` : 'Все кроссовки'}</h1>
                        <div className="snikers-search">
                            <Search className='search-icon search'/>
                            <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Поиск..."/>
                            {value && <X className='search-icon close' onClick={() => setValue('')}/> }
                        </div>
                    </div>
                </div>
                <ul className="picture-list">
                    {renderItems()}
                </ul>
        
            </div>
        </>
    )
}