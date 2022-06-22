
import "./ItemDetail.css"
import ItemCount from "../ItemCount/ItemCount"
import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import CartContext from "../Context/CartContext"

const ItemDetail = ({id, name, precio, img, descripcion, stock}) => {

  const [Quantity, SetQuantity] = useState(0)

  const {addItem, getProduct } = useContext(CartContext)

  const handleOnAdd = (Quantity) =>{
    console.log(`agregaste al carrito = ${Quantity}`)
    SetQuantity(Quantity)

    addItem({id, name, precio, Quantity})
  }

  return (
    <div className='box-ItemDetail'>
        <div className='box-img'>
          <img className='img-detail' src={img} alt="Zapatillas-nike" />
        </div>
        <div className='box-descripcion'>
          <h1 className='titulo-detail'>{name}</h1>
          <p className='descripcion-detail'> {descripcion} </p>
          <p className='precio-detail'> ARS$ {precio} </p>

            <div className='card'>
                <div className='contenido'>
                      <div className='zapatillas-colores'>
                          <h3>Color :</h3>
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                      </div>
                </div>
            </div>
          <div>
              {Quantity > 0 ? <Link className="btn-detalle" to="/cart">Finalizar Compra</Link> : <ItemCount onAdd={handleOnAdd} stock={stock} initial={getProduct(id)?.Quantity} /> }
          </div>
        </div>
    </div>
  )
}

export default ItemDetail