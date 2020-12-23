import ComponentsCheckoutShippingRate from "../ShippingRate";
import {useMemo, useState} from "react";

export default function ComponentsCheckoutShipping({shipping}) {
    const [shippingRateSelected, setShippingRate] = useState("");
    const [selectedShipments, setSelectedShipments] = useState({});
    useMemo(() => {
        // shipping.shippingRates.nodes.map((shp)=>{
        // console.log(shipping.shippingRates.nodes, "D")
        // })
        // currentOrder.shipments.nodes.map((shipment) => {
        let currentSelected = shipping.shippingRates.nodes.find((el) => el.selected === true);
        if (currentSelected) {
            setShippingRate(currentSelected.id);
        }
        // })
    }, [])
    return (
        <form className="w-full space-y-4">
            {
                shipping.stockLocation &&
                <div
                    className="w-full mb-4 px-3 py-2 rounded bg-blue-500 text-white">{shipping.stockLocation.name}</div>
            }
            {
                shipping.shippingRates.nodes.map((shippingRate, i) => (
                    <ComponentsCheckoutShippingRate
                        shipping={shipping}
                        shippingRate={shippingRate}
                        checked={shippingRateSelected === shippingRate.id}
                        key={i}
                        handleSelect={(id) => {
                            setShippingRate(id);
                        }}
                    />
                ))
            }
        </form>
    )
}