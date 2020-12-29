import {useContext, useMemo, useState} from "react";
import ButtonsPrimary from "../../Buttons/primary";
import {OrderContext} from "../../../stores/userOrder";
import {useMutation} from "@apollo/client";
import NEXT_STATE_MUTATION from "../../../graphql/mutations/cart/nextState";
import {useToasts} from "react-toast-notifications";

export default function CheckoutShippingSelected({shipping}) {
    const [shippingRateSelected, setShippingRate] = useState(null);
    const {state, dispatch} = useContext(OrderContext);
    const {addToast} = useToasts();

    useMemo(() => {
        let currentSelected = shipping.shippingRates.nodes.find((el) => el.selected === true);
        if (currentSelected) {
            setShippingRate(currentSelected);
        }
        // })
    }, [])

    const [toNextState, {data, loading, error}] = useMutation(NEXT_STATE_MUTATION, {
        onCompleted: (newData) => {
            if (newData.nextCheckoutState.errors.length > 0) {
                addToast(newData.nextCheckoutState.errors[0].message, {
                    appearance: "error"
                })
            } else {
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...newData.nextCheckoutState.order}});
            }
        }
    })

    const handleClick = () => {
        if (state.order.state === "delivery") {
            toNextState();
            console.log("Vamos a hacer next");
        } else {
            alert(state.order.state)
        }
    }
    return (
        <div className="w-full">
            Método de envío seleccionado
            {
                shippingRateSelected ?
                    <div className="w-full">

                        <p>{shippingRateSelected.shippingMethod.name}: <strong>{shippingRateSelected.cost} {shippingRateSelected.currency}</strong>
                        </p>
                    </div>
                    :
                    <p>Selecciona un método de envío</p>
            }
            <ButtonsPrimary onClick={handleClick}
                            text={"Siguiente"}
            />
        </div>
    )
}