import "./ItemCount.css"
import { useState } from "react";


const ItemCount = ({stock, initial=1, onAdd})=>{

    const [Quantity, SetQuantity] = useState(parseInt(initial));

    const onIncrement = () => {
		if (Quantity < stock) {
			SetQuantity(Quantity + 1);
		}
	};

	const onSubtraction = () => {
		if (Quantity > 1) {
			SetQuantity(Quantity - 1);
		}
	};

    return(
        <div>
            <div className="box-btnprod">
                <button className="btn-rest" onClick={onSubtraction}>
                    -
                </button>
                    <span className="span-num-prod">
                        {Quantity}
                    </span>
                <button className="btn-sum" onClick={onIncrement}>
                    +
                </button>
            </div>
            <div className='box-btnbuy'>
              <button className='btn-buy' onClick={()=> onAdd(Quantity) } >Agregar Al Carrito</button>
            </div>
        </div>
    )
}

export default ItemCount;