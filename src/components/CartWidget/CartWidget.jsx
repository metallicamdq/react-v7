import { useContext } from "react";
import CartContext from "../Context/CartContext";
import { Link } from "react-router-dom";

const CartWidget = () =>{

    const {getQuantity} = useContext(CartContext)

    const Quantity = getQuantity()

    return(
        <div>
            <Link className="btn-interaz" to="/cart">
            <i className="fa-solid fa-cart-shopping">
                    <span> {Quantity} </span>
                </i>
            </Link>
        </div>
    )
}

export default CartWidget;