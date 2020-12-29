import {useContext, useEffect, useMemo, useState} from "react";
import {OrderContext} from "../../../../stores/userOrder";
import CheckoutShippingSelected from "../../ShippingSelected";

export default function OnePageDataCheckout({shipments}) {
    const {state, dispatch} = useContext(OrderContext);

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
                shipments.map((shipment,) => (
                    <CheckoutShippingSelected shipping={shipment}/>
                ))
            }

        </div>
    );
}