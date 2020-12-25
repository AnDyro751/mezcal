import {useContext} from 'react';
import ButtonsPrimary from "../primary";
import {useMutation} from "@apollo/client";
import {ADD_PRODUCT_TO_CART_MUTATION} from "../../../graphql/mutations/products/addProductToCart";
import {useToasts} from "react-toast-notifications";
import {OrderContext} from "../../../stores/userOrder";
import emptyObject from "../../../lib/emptyObject";
import CREATE_ORDER_MUTATION from "../../../graphql/mutations/cart/createOrder";
import setCookie from "../../../lib/setCookie";

export default function AddProductToCart({product}) {
    const currentVariant = product.masterVariant;
    const {addToast} = useToasts()
    const {state, dispatch} = useContext(OrderContext);
    const [createOrder, {data: dataOrder, loading: loadingOrder, error: errorOrder}] = useMutation(CREATE_ORDER_MUTATION, {
        onCompleted: (newDataOrder) => {
            dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...newDataOrder.createOrder.order}});
            setCookie('authorization_guest_token', newDataOrder.createOrder.order.guestToken)
            console.log("TOKEN", newDataOrder.createOrder.order.guestToken);
            addToCart();
        }
    });
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
        console.log(emptyObject(state.order))
        if (emptyObject(state.order)) {
            createOrder();
        } else {
            addToCart();
        }
    }
    return (
        <ButtonsPrimary customClass="w-full flex justify-center" onClick={handleClick} disabled={loading}
                        loading={loading || loadingOrder} text={"Agregar al carrito"}/>
    )
}