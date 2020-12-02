import {useMutation} from "@apollo/client";
import {ADD_PRODUCT_TO_CART_MUTATION} from "../../../graphql/mutations/products/addProductToCart";
import {initializeApollo} from "../../../lib/apolloClient";
import ButtonsPrimary from "../../Buttons/primary";
import {useState} from 'react';

const apolloClient = initializeApollo()

export default function ProductData({product}) {
    const [addToCart, {data: newData, loading, error}] = useMutation(ADD_PRODUCT_TO_CART_MUTATION, {
        client: apolloClient
    })
    const [variants, setVariants] = useState(product.variants || []);
    const [currentVariant, setCurrentVariant] = useState(product.masterVariant || {})
    // console.log(product.masterVariant);
    return (
        <div className="w-full">
            <h1 className="font-medium text-3xl">{product.name}</h1>
            <h2 className="font-normal" >{currentVariant.defaultPrice.displayAmount}</h2>
            <ButtonsPrimary
                customClass="w-full text-center justify-center"
                loading={loading} text={"Agregar al carrito"}
                onClick={addToCart}
            />
            {/*<button onClick={addToCart}>Agregar al carrito</button>*/}

        </div>
    )
}