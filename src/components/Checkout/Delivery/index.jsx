import withApollo from "../../../lib/apollo";
import ComponentsCheckoutShippingRate from "../ShippingRate";
import {useState} from 'react';
import ButtonsPrimary from "../../Buttons/primary";

function ComponentCheckoutDelivery({currentOrder = {}}) {
    const [shippingRateSelected, setShippingRate] = useState("");
    return (
        <div className="w-10/12 mx-auto">
            <div className="w-full space-y-4">
                <div className="md:w-6/12 w-full space-y-4">
                    <h3>Envíos</h3>
                    {
                        currentOrder.shipments.nodes.map((shipment) => {
                            return shipment.shippingRates.nodes.map((shippingRate, i) => (
                                <ComponentsCheckoutShippingRate
                                    shippingRate={shippingRate}
                                    checked={shippingRateSelected === shippingRate.id}
                                    key={i}
                                    handleSelect={(id) => {
                                        setShippingRate(id);
                                    }}
                                />
                            ))
                        })
                    }
                </div>
                <div className="w-full">
                    <ButtonsPrimary text={"Continuar con el pago"} customClass="w-full text-center flex justify-center"/>
                </div>
            </div>
        </div>
    )
}

export default withApollo({ssrc: true})(ComponentCheckoutDelivery)