import {useContext} from 'react';
import ButtonsPrimary from "../primary";
import {useMutation} from "@apollo/client";
import {ADD_PRODUCT_TO_CART_MUTATION} from "../../../graphql/mutations/products/addProductToCart";
import {useToasts} from "react-toast-notifications";
import {OrderContext} from "../../../stores/userOrder";


export default function AddProductToCart({product}) {
    const currentVariant = product.masterVariant;
    // console.log(currentVariant)
    const {addToast} = useToasts()
    const {state, dispatch} = useContext(OrderContext);

    const [addToCart, {data: newData, loading, error}] = useMutation(ADD_PRODUCT_TO_CART_MUTATION, {
        variables: {
            variantId: currentVariant.id,
            quantity: 1
        },
        onCompleted: (data) => {
            if (data.addToCart.errors.length > 0) {
                addToast(data.addToCart.errors[0].message, {
                    appearance: 'error',
                })
            } else {
                addToast('Producto agregado al carrito', {
                    appearance: 'success',
                    withlink: "/cart",
                    withtext: "Ver carrito"
                })
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...data.addToCart.order}});
            }
        },
        onError: (e) => {
            addToast(e.message, {appearance: 'error'})
        }
    })

    const handleClick = () => {
        addToCart();
    }
    return (
        <ButtonsPrimary customClass="w-full flex justify-center" onClick={handleClick} disabled={loading}
                        loading={loading} text={"Agregar al carrito"}/>
    )
}