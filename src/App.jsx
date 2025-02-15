import React from 'react';
import './index.scss'
import { Header } from './components/header/Header';
import { Snikers } from './components/snikers/Snikers';
import { Cart } from './components/cart/Cart';
import { Favorite } from './components/favorite/Favorite';
import axios from 'axios'
import {Routes, Route} from 'react-router-dom'

export const AllContext = React.createContext(null)

function App() {
  const [cartItems, setCartItems] = React.useState([])
  const [cartOpen, setCartOpen] = React.useState(false)

  const [cart, setCart] = React.useState([])
  const [favorite, setFavorite] = React.useState(() => {
    const getItem = localStorage.getItem('favorite')
    const parseItem = JSON.parse(getItem)
    return parseItem !== null ? parseItem : []
  })
  const [favoriteOpen, setFavoriteOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)



  const onAddFavorite = (obj) => {
    const updateItem = favorite.some(i => i.id === obj.id)

    if (!updateItem) {
      setFavorite(prev => {
        const updateFavorite = [...prev, obj]
        localStorage.setItem('favorite', JSON.stringify(updateFavorite))
        return updateFavorite
      })

    }
    else{
      setFavorite(prev => {
        const updateFavorite = prev.filter(i => i.id !== obj.id)
        localStorage.setItem('favorite', JSON.stringify(updateFavorite))
        return updateFavorite
      })

    }

  }

  const onAddCart = async (obj) => {
    try{
      const updateItem = cart.find(i => Number(i.parentId) === Number(obj.id))

      if (updateItem) {
          setCart(prev => prev.filter(i => Number(i.parentId) !== Number(obj.id)))
          await axios.delete(`https://67a9e3a165ab088ea7e4d985.mockapi.io/cart/${Number(updateItem.id)}`)
      } else{
          const {data} = await axios.post(`https://67a9e3a165ab088ea7e4d985.mockapi.io/cart`, obj)
          setCart(prev => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в корзину ' + error)
    }

  }

  const isItemAdded = (id) => {
    return cart.some(obj => Number(obj.parentId) === Number(id))
  }

  const isFavoriteAdded = (id) => {
    return favorite.some(i => Number(i.id) === Number(id))
  }

  

  React.useEffect(() => {
    // fetch('https://67a9e3a165ab088ea7e4d985.mockapi.io/snikers').then(res => {
    //   return res.json()
    // }).then(
    //   json => setCartItems(json)
    // ).catch(error => alert('ошибка данных' + error))

    async function fetchData() {
      try{
        setIsLoading(true)
        const cartResponse = await axios.get('https://67a9e3a165ab088ea7e4d985.mockapi.io/cart')
        const snikersResponse = await axios.get('https://67a9e3a165ab088ea7e4d985.mockapi.io/snikers')
  
        setIsLoading(false)
  
        setCart(cartResponse.data)
        setCartItems(snikersResponse.data)
      } catch (error) {
        alert('Ошибка данных ' + error)
      }
    }
    fetchData()
    
  }, [])

  return (
    <>
    <AllContext.Provider value={{cart, setCart, cartItems, favorite, onAddCart, onAddFavorite, isLoading, isItemAdded, isFavoriteAdded, cartOpen}}>
      <div className="wrapper">
      {<Header onClickOpenFavorite={() => setFavoriteOpen(true)} onClickOpen={() => setCartOpen(true)}/>}
        <Routes>
          <Route path='/' element={<Snikers />} />
          <Route path='/favorite' element={favoriteOpen && <Favorite />} />
        </Routes>
        <Cart opened={cartOpen} onClickClose={() => setCartOpen(false)}/>
      </div>
    </AllContext.Provider>
    </>
  );
}

export default App;
