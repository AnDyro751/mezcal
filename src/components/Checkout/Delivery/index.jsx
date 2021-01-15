import ComponentsCheckoutShipping from "../Shipping";
import {useMutation} from "@apollo/client";
import NEXT_STATE_MUTATION from "../../../graphql/mutations/cart/nextState";
import Router from "next/router";
import {useContext} from "react";
import {OrderContext} from "../../../stores/userOrder";
import {useToasts} from "react-toast-notifications";

function ComponentCheckoutDelivery({currentOrder}) {

    const {state, dispatch} = useContext(OrderContext);
    const {addToast} = useToasts();

    const [toNext, {loading: loadingNext}] = useMutation(NEXT_STATE_MUTATION, {
        onCompleted: (newData) => {
            if (newData.nextCheckoutState.errors.length >= 1) {
                addToast(newData.nextCheckoutState.errors[0].message, {
                    appearance: 'error'
                });
            } else {
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...newData.nextCheckoutState.order}});
                Router.push("/payment")
            }
        }
    });
    const handleClick = () => {
        if (state.order.state === "delivery") {
            toNext();
        } else {
            Router.push(`/${state.order.state}`)
        }
    }

    return (
        <div className="w-full mx-auto">
            <div className="w-full space-y-4">
                <div className="w-full space-y-4">
                    <h3>Envíos</h3>
                    {
                        currentOrder.shipments.nodes.map((shipment, i) =>
                            <ComponentsCheckoutShipping shipping={shipment} key={i}/>
                        )
                    }
                </div>
                <div className="w-full">
                    <button onClick={handleClick}>
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ComponentCheckoutDelivery
