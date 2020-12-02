import {useMutation} from "@apollo/client";
import {ADD_PRODUCT_TO_CART_MUTATION} from "../../../graphql/mutations/products/addProductToCart";
import {initializeApollo} from "../../../lib/apolloClient";
import ButtonsPrimary from "../../Buttons/primary";

const apolloClient = initializeApollo()

export default function ProductData({product}) {
    const [addToCart, {data: newData, loading, error}] = useMutation(ADD_PRODUCT_TO_CART_MUTATION, {
        client: apolloClient
    })
    return (
        <div className="w-full">
            <h1 className="font-medium text-3xl" >{product.name}</h1>
            <ButtonsPrimary
                customClass="w-full text-center justify-center"
                loading={loading} text={"Agregar al carrito"}
                onClick={addToCart}
            />
            {/*<button onClick={addToCart}>Agregar al carrito</button>*/}

        </div>
    )
}