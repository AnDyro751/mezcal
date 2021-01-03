import OnePageStepper from "../Stepper";
import ComponentsCheckoutShipping from "../../Shipping";

export default function OnePageDelivery({shipments}) {
    return (
        <div className="w-full mt-4">
            <OnePageStepper
                small
                text={"Método de envío"} open={false}>
                {shipments.nodes.map((shipment, i) => (
                    <ComponentsCheckoutShipping shipping={shipment} key={i}/>
                ))}
            </OnePageStepper>
        </div>
    )
}