import {useContext, useEffect, useMemo, useState} from "react";
import {OrderContext} from "../../../../stores/userOrder";
import CheckoutShippingSelected from "../../ShippingSelected";
import ButtonsPrimary from "../../../Buttons/primary";
import {useToasts} from "react-toast-notifications";

export default function OnePageDataCheckout({shipments}) {
    const {state, dispatch} = useContext(OrderContext);


    const handleClick = () => {
        alert(state.order.state);
    }

    return (
        <div className="w-full">
            <p>
                Current step: <strong>{state.order.state}</strong>
            </p>
            {
                state.order.state === "address" &&
                <input type="submit" value={"Enviar"} form={"addressForm"}/>
            }

            {
                shipments.map((shipment, i) => (
                    <CheckoutShippingSelected key={i} shipping={shipment}/>
                ))
            }

            <ButtonsPrimary onClick={handleClick}
                            text={"Siguiente"}
            />

        </div>
    );
}