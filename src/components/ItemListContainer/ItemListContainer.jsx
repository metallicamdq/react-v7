import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../service/firebase";

const ItemListContainer = () =>{

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const {categoriaId} = useParams()

    useEffect(() => {

        const colletionRef = categoriaId
        ? query(collection(db, "products"), where("categoria", "==", categoriaId))
        : collection(db, "products")

        getDocs(colletionRef).then(response =>{
            const products = response.docs.map(doc =>{
                return {id: doc.id, ...doc.data()}
            })
            setProducts(products)
        }).catch(e => {
            console.log(e)
        }).finally(() =>{
          setLoading(false, 2500)
        })
    }, [categoriaId])

    if(loading){
        return <div className='loading'>
          <img src="https://www.wsj.com/coupons/static/shop/32174/logo/Nike-coupons.png" alt="logo-nike" />
          <h1 >Cargando...</h1>
        </div>
      }

    return(
        <div>
            <ItemList products={products} />
        </div>
    )
}

export default ItemListContainer;