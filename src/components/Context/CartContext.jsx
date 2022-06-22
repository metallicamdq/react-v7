import { useState, createContext} from "react";

const CartContext = createContext()

export const CartContextProvider = ({children})=>{

    const [cart, setCart] = useState([])

    const addItem = (productoToAdd) =>{

        if(!isInCart(productoToAdd.id)){

          setCart([...cart, productoToAdd])

        }else{

          const newCart = cart.map(prod =>{
            if(prod.id === productoToAdd.id){

              const newProduct = {
                ...prod, Quantity: productoToAdd.Quantity + prod.Quantity
              }
              return newProduct

            }else{

              return prod

            }
          })
          setCart(newCart)
        }
      }

      const getQuantity = () =>{
        let coon = 0
        cart.forEach(prod => {
          coon += prod.Quantity

        });

        return coon
      }

        const getProduct = (id) => {
          return cart.find(prod => prod.id === id)
      }

      const isInCart = (id) =>{
        return cart.some(prod => prod.id === id)
      }

      const removeItem = (id) =>{
        const newCart = cart.filter(prod => prod.id !== id)

        setCart(newCart)
      }

      const vaciar = () =>{
        setCart([])
      }

      const precioTotal = () =>{
        let total = 0
        cart.forEach(prod =>{
          total += prod.Quantity * prod.precio
        })
        return total
      }

    return(
        <CartContext.Provider value={{cart, addItem, getQuantity, getProduct , removeItem, vaciar, precioTotal}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext