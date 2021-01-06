import {useContext, useMemo, useState} from "react";
import {OrderContext} from "../../../stores/userOrder";

export default function CurrentShippingRate({}) {
    const [shippingRateSelected, setShippingRate] = useState(null);
    const {state,} = useContext(OrderContext);

    useMemo(() => {
        let currentSelected = state.order.shippingRates.nodes.find((el) => el.selected === true);
        if (currentSelected) {
            setShippingRate(currentSelected);
        }
    }, [])
    return (
        <div className="w-full">
            {
                shippingRateSelected ?
                    <div className="w-full">
                        Método de envío seleccionado
                        <p>{shippingRateSelected.shippingMethod.name}: <strong>{shippingRateSelected.cost} {shippingRateSelected.currency}</strong>
                        </p>
                    </div>
                    :
                    <p>Selecciona un método de envío</p>
            }
        </div>
    )
}