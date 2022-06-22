import React from 'react'
import Itemcard from '../ItemCard/ItemCard'
import "./ItemList.css"


const ItemList = ({products}) => {
  console.log(products)
  return (
      <div className="box-itemlist">
        {products.map(products => <Itemcard key={products.id} {...products}/>)}
      </div>
  )
}

export default ItemList