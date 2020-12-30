import {useContext, useEffect, useMemo, useState} from "react";
import {OrderContext} from "../../../../stores/userOrder";
import CheckoutShippingSelected from "../../ShippingSelected";
import ButtonsPrimary from "../../../Buttons/primary";
import {useToasts} from "react-toast-notifications";

export default function OnePageDataCheckout({shipments, currentOrder}) {
    const {state, dispatch} = useContext(OrderContext);

    console.log(state);


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
            {
                state.order.adjustments &&
                <div className="w-full my-4 space-y-4">
                    {
                        state.order.adjustments.nodes &&
                        state.order.adjustments.nodes.map((adjustment, i) => (
                            <div
                                title={`${adjustment.eligible ? "" : "No aplica"}`}
                                className={`${adjustment.eligible ? "" : "opacity-50"} ${adjustment.eligible ? "" : "line-through"} w-full flex items-center justify-between`}
                                key={i}>
                                <div
                                    className="bg-gray-200 font-normal text-gray-800 w-auto px-5 py-2 rounded uppercase">{adjustment.promotionCode.value}</div>
                                <div className="w-auto">
                                    <span
                                        className={`text-gray-500 text-sm`}>{adjustment.amount} {state.order.currency}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }

            <ButtonsPrimary onClick={handleClick}
                            text={"Siguiente"}
            />

        </div>
    );
}