import { useContext } from "react"
import CartContext from "../Context/CartContext"
import { db } from "../../service/firebase";
import { addDoc, collection, query, where, documentId, writeBatch, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom"
import "./Cart.css"


const Cart = () => {

  const {cart, removeItem, vaciar, precioTotal, getQuantity} = useContext(CartContext)

  const Quantity = getQuantity()

  const createOrder= () =>{

    const objOrder ={
      buyer:{
        name: "",
        email:"",
        phone:""
      },
      items: cart,
      total: precioTotal()
    }

    const ids = cart.map(prod => prod.id)
    console.log(ids);

    const batch = writeBatch(db)

    const outOfStock = []

    const collectionRef = collection(db, "products")

    getDocs(query(collectionRef, where(documentId(), "in", ids)))
    .then(response =>{
        response.docs.forEach(doc =>{
            const dataDoc = doc.data()
            const prodQuantity = cart.find(prod => prod.id === doc.id)?.Quantity

            if(dataDoc.stock >= prodQuantity){
                batch.update(doc.ref, {stock:dataDoc.stock - prodQuantity})
            }else{
                outOfStock.push({id: doc.id, ...dataDoc})
            }
        })
    }).then(()=>{
        if(outOfStock.length === 0){
            const collectionRef = collection(db, "products")

            return addDoc(collectionRef, objOrder)
        }else{
            return Promise.reject({type: "no hay stock", products: outOfStock})
        }
    }).then(({id})=>{
        batch.commit()
    }).catch(error =>{
        console.log(error)
    })

  }

  return (
    <div className="box-cart">
      <div className="box-titulo">
        <h2>Carrito</h2>
      </div>
        {Quantity > 0 ? <div>
           {cart.map(prod => {
             return(
               <div key={prod.id} className="cart">
                 <div>{prod.name}</div>
                 <div>Cantidad: {prod.Quantity}</div>
                 <div>Precio x uni: ${prod.precio} </div>
                 <div>SubTotal: ${prod.precio * prod.Quantity} </div>
                 <button className="btn-eliminar" onClick={()=> removeItem(prod.id)}>X</button>
               </div>
             )})
            }
            <div className="total-precio">Total: ${precioTotal()} </div>
            <div className="box-btns">
              <div className="box-btnvaciar">
                <button className="btn-vaciar" onClick={()=> vaciar()}>Vaciar</button>
              </div>
              <div className="box-btnfisish">
                <Link className="btn-finish" to="/usuario" onClick={createOrder}>Finalizar Compra</Link>
              </div>
            </div>
        </div> : <div className="box-cart-vacio">
          <span className="cart-vacio-titulo">Carrito Vacio</span>
          </div>}
    </div>
  )
}

export default Cart