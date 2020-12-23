import withApollo from "../../../lib/apollo";
import ComponentsCheckoutShipping from "../Shipping";
import {useContext} from "react";
import {OrderContext} from "../../../stores/userOrder";
import ButtonsPrimary from "../../Buttons/primary";
import {useMutation} from "@apollo/client";
import NEXT_STATE_MUTATION from "../../../graphql/mutations/cart/nextState";
import Router from "next/router";
import {useToasts} from "react-toast-notifications";
import Link from 'next/link'

function ComponentCheckoutDelivery({currentOrder = {}}) {
    const {state, dispatch} = useContext(OrderContext);
    const {addToast} = useToasts()

    const [handleNext, {data, loading, error}] = useMutation(NEXT_STATE_MUTATION, {
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
        if(state.order.state === "delivery"){
            handleNext();
        }else{
            Router.push(`/${state.order.state}`);
        }
    }


    return (
        <div className="w-10/12 mx-auto">
            <div className="w-full space-y-4">
                <div className="md:w-6/12 w-full space-y-4">
                    <h3>Envíos</h3>
                    {
                        currentOrder.shipments.nodes.map((shipment, i) =>
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

export default withApollo({ssrc: true})(ComponentCheckoutDelivery)