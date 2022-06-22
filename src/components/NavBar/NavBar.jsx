import React from "react";
import "./NavBar.css"
import CartWidget from "../CartWidget/CartWidget";
import CartContext from "../Context/CartContext";
import { Link } from "react-router-dom";
import { useContext } from "react";


const NavBar = () => {

    const {getQuantity} = useContext(CartContext)

    const Quantity = getQuantity()

    return (
        <nav className="nav">
            <Link to="/">
                <img className="logo" src="https://www.wsj.com/coupons/static/shop/32174/logo/Nike-coupons.png" alt="logo-nike"></img>
            </Link>
            <ul className="nav-menu">
                <li className="nav-menu_li"><Link className="link-a" to="/">Inicio</Link></li>
                <li className="nav-menu_li"><Link className="link-a" to="/Air">Nike Air</Link></li>
                <li className="nav-menu_li"><Link className="link-a" to="/Jordan">Nike Jordan</Link></li>
                <li className="nav-menu_li"><Link className="link-a" to="/Roshe">Nike Roshe</Link></li>
            </ul>
            <Link className="btn-interaz" to="/usuario"><i className="fa-solid fa-user"></i></Link>
            {Quantity > 0 && <CartWidget />}
        </nav>
    );
}

export default NavBar;