import React from 'react'
import { useState, useEffect, } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'
import { db } from '../../service/firebase'
import { getDoc, doc } from 'firebase/firestore'


const ItemDetailContainer = () => {

  const [product, setProduct] = useState()
  const [loading, setLoading] = useState(true)



  const { productId } = useParams()

    useEffect(() => {
      getDoc(doc(db, 'products', productId)).then(response => {
          const product = { id: response.id, ...response.data()}
          setProduct(product)
      }).catch(e => {
          console.log(e)
      }).finally(() =>{
        setLoading(false, 2500)
      })
  }, [productId])


  if(loading){
    return <div className='loading'>
      <img src="https://www.wsj.com/coupons/static/shop/32174/logo/Nike-coupons.png" alt="logo-nike" />
      <h1 >Cargando...</h1>
    </div>
  }

  return (
    <div className='ItemDetailContainer'>
      <ItemDetail {...product} />
    </div>
  )

}

export default ItemDetailContainer