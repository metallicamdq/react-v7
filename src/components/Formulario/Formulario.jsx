import { db } from "../../service/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Context/CartContext";
import "./Formulario.css"

const OrdenFinal = () => {
    const { cart, vaciar, precioTotal} = useContext(CartContext);
    const [orderId, setOrderId] = useState("");
    const [creatingOrder, setCreatingOrder] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const sendOrder = e => {
        e.preventDefault();
        setCreatingOrder(true);
        delete formData.emailConfirm;
        const order = {
            datos: formData,
            date: Timestamp.fromDate(new Date()),
            items: cart,
            total: precioTotal()
        };
        const coleccionOrder = collection(db, "orders");
        addDoc(coleccionOrder, order)
            .then(resp => setOrderId(resp.id))
            .catch(err => console.log(err))
            .finally(() => {
                setCreatingOrder(false);
                setFormData({ name: "", email: "", phone: "" });
                vaciar()
            })
    };
    return (
        <div>
            <div >
                {creatingOrder ? (
                    <div>
                    </div>
                ) : orderId ? (
                    <div className=" box-orders">
                        {orderId && <h1>Codigo de Orden ID: {orderId }</h1>}
                        <Link to="/">
                            <button>Volver al inicio</button>
                        </Link>
                    </div>
                ) : (
                    <div>
                        <form
                            onSubmit={sendOrder}
                            onChange={handleChange}
                        >
                            <div >
                                <label>Nombre y Apellido</label>
                                <input
                                    type="name"
                                    name="name"
                                    defaultValue={formData.name}
                                    required
                                />
                            </div>
                            <div>
                                <label >Telefono</label>
                                <input
                                    type="number"
                                    name="phone"
                                    defaultValue={formData.phone}
                                    required
                                />
                            </div>
                            <div >
                                <label >E-mail</label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={formData.email}
                                    required
                                />
                            </div>
                            <button
                                disabled={
                                    !formData.name ||
                                    !formData.phone ||
                                    !formData.email ||
                                    cart.length === 0
                                }
                            >
                                Confirmar Compra
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div >
    )

}


export default OrdenFinal;
