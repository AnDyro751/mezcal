import OnePageStepper from "../Stepper";
import ComponentsCheckoutShipping from "../../Shipping";
import {useContext} from "react";
import {OrderContext} from "../../../../stores/userOrder";

export default function OnePageDelivery({shipments}) {
    const {state,} = useContext(OrderContext);

    return (
        <div className="w-full mt-4">
            <OnePageStepper
                small
                text={"Método de envío"} open={false}>
                {
                    state.order &&
                    state.order.shipments &&
                    state.order.shipments.nodes.length > 0 ?
                        state.order.shipments.nodes.map((shipment, i) => (
                            <ComponentsCheckoutShipping shipping={shipment} key={i}/>
                        ))
                        :
                        <div className="w-full">
                            <span className="text-gray-400 uppercase animate-pulse text-sm font-medium">
                                Cargando métodos de envío...
                            </span>
                        </div>
                }
            </OnePageStepper>
        </div>
    )
}