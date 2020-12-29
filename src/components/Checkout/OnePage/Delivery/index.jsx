import OnePageStepper from "../Stepper";
import ComponentsCheckoutShipping from "../../Shipping";

export default function OnePageDelivery({shipments}) {
    return (
        <div className="w-full space-y-4">
            <OnePageStepper text={"3. Método de envío"} open={false}>
                {shipments.nodes.map((shipment, i) => (
                    <ComponentsCheckoutShipping shipping={shipment} key={i}/>
                ))}
            </OnePageStepper>
        </div>
    )
}