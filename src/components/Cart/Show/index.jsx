import CartListLineItems from "../ListLineItems";
import {gql, useQuery} from "@apollo/client";
import {MAIN_QUERY} from "../../../graphql/queries/main";
import SHOW_CART_QUERY from "../../../graphql/queries/pages/cart";
import withApollo from "../../../lib/apollo";
import CartTotalInfo from "../TotalInfo";
import CartCouponsInfo from "../CouponsInfo";
import {useContext} from "react";
import {OrderContext} from "../../../stores/userOrder";
import ButtonsPrimary from "../../Buttons/primary";
import {useMutation} from "@apollo/client";
import NEXT_STATE_MUTATION from "../../../graphql/mutations/cart/nextState";
import Router from "next/router";
import {useToasts} from "react-toast-notifications";
import Link from 'next/link'
import moreState from "../../../lib/moreState";
import emptyObject from "../../../lib/emptyObject";
import EmptyObjects from "../../EmptyObjects";

function CartShow() {
    const {state, dispatch} = useContext(OrderContext);
    const {addToast} = useToasts()

    const {data, loading, error} = useQuery(gql`${MAIN_QUERY(null, SHOW_CART_QUERY)}`, {
        fetchPolicy: "network-only"
    });

    const [handleNext, {loading: loadingMutation, data: dataMutation}] = useMutation(NEXT_STATE_MUTATION, {
        onCompleted: (mainData) => {
            if (mainData.nextCheckoutState.errors.length > 0) {
                addToast(mainData.nextCheckoutState.errors[0].message, {
                    appearance: 'error'
                });
            } else {
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...mainData.nextCheckoutState.order}});
                Router.push(`/${mainData.nextCheckoutState.order.state}`);
            }
        },
        onError: (e) => {
            addToast(e.message ? e.message : e, {
                appearance: 'error'
            });
        }
    });

    const handleClick = () => {
        handleNext();
    }

    if (loading) {
        return (
            <h2>Cargando carrito</h2>
        )
    }
    if (error) {
        return (
            <h2>ERROR</h2>
        )
    }

    if (data) {
        if (!data.currentOrder) {
            return (
                <div className="min-h-screen items-center flex"><EmptyObjects message={"Tu carrito está vacío"} withButton={"/products"}
                                                             withButtonText={"Ver productos"}/></div>)
        }
        if (data) {
            if (data.currentOrder) {
                if (data.currentOrder.lineItems.nodes.length <= 0) {
                    return (
                        <div className="min-h-screen items-center flex"><EmptyObjects message={"Tu carrito está vacío"}
                                                                     withButton={"/products"}
                                                                     withButtonText={"Ver productos"}/></div>)
                }
            }
        }
    }

    return (
        <div className="w-full">
            {
                !emptyObject(state.order) &&
                <>
                    <CartListLineItems currentOrder={data.currentOrder}/>
                    <CartTotalInfo currentOrder={data.currentOrder}/>
                    <CartCouponsInfo currentOrder={data.currentOrder}/>
                </>
            }
            {
                !emptyObject(state.order) &&
                moreState(state.order.state, "cart") ?
                    <ButtonsPrimary
                        onClick={handleClick}
                        loading={loadingMutation}
                        text={"Continuar"}
                    />
                    :
                    <Link href={`/address`}>
                        Continuar
                    </Link>
            }
        </div>
    )
}

export default withApollo({ssr: true})(CartShow);
