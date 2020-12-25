import ComponentsCheckoutShipping from "../Shipping";
import {useContext} from "react";
import {OrderContext} from "../../../stores/userOrder";
import ButtonsPrimary from "../../Buttons/primary";
import {useMutation, useQuery} from "@apollo/client";
import NEXT_STATE_MUTATION from "../../../graphql/mutations/cart/nextState";
import Router from "next/router";
import {useToasts} from "react-toast-notifications";
import PAGE_DELIVERY_QUERY from "../../../graphql/queries/pages/delivery";

function ComponentCheckoutDelivery({}) {
    const {state, dispatch} = useContext(OrderContext);
    const {addToast} = useToasts()
    const {data: dataQuery, loading: loadingQuery} = useQuery(PAGE_DELIVERY_QUERY);

    const [handleNext, {data, loading, error}] = useMutation(NEXT_STATE_MUTATION, {
        onCompleted: (mainData) => {
            if (mainData.nextCheckoutState.errors.length > 0) {
                addToast(mainData.nextCheckoutState.errors[0].message, {
                    appearance: 'error'
                });
            } else {
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...mainData.nextCheckoutState.order}});
                Router.push(`/payment`);
            }
        },
        onError: (e) => {
            addToast(e.message ? e.message : e, {
                appearance: 'error'
            });
        }
    });
    const handleClick = () => {
        if (state.order.state === "delivery") {
            handleNext();
        } else {
            Router.push(`/payment`);
        }
    }

    if (loadingQuery) {
        return (
            <h2>Cargando envíos</h2>
        )
    }

    return (
        <div className="w-10/12 mx-auto">
            <div className="w-full space-y-4">
                <div className="md:w-6/12 w-full space-y-4">
                    <h3>Envíos</h3>
                    {
                        dataQuery.currentOrder.shipments.nodes.map((shipment, i) =>
                            <ComponentsCheckoutShipping shipping={shipment} key={i}/>
                        )
                    }
                </div>
                <div className="w-full">
                    <ButtonsPrimary
                        onClick={handleClick}
                        text={`Continuar con el pago`}
                    />
                </div>
            </div>
        </div>
    )
}

export default ComponentCheckoutDelivery
