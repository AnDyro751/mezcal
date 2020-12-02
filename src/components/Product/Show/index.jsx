import {useMutation} from "@apollo/client";
import {initializeApollo} from "../../../lib/apolloClient";
import ProductGallery from "../gallery";
import {ADD_PRODUCT_TO_CART_MUTATION} from "../../../graphql/mutations/products/addProductToCart";

const apolloClient = initializeApollo()

export default function ComponentsProductShow({product = {}}) {
    const [addToCart, {data: newData, loading, error}] = useMutation(ADD_PRODUCT_TO_CART_MUTATION, {
        client: apolloClient
    })
    return (
        <div className="w-10/12 mx-auto flex">
            <div className="w-7/12">
                <ProductGallery product={product}/>
            </div>
            <div className="w-5/12">
                <button onClick={addToCart}>Agregar al carrito</button>
            </div>
        </div>
    )
}