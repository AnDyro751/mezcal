import {useMemo, useState} from "react";

export default function CheckoutShippingSelected({shipping}) {
    const [shippingRateSelected, setShippingRate] = useState(null);

    useMemo(() => {
        let currentSelected = shipping.shippingRates.nodes.find((el) => el.selected === true);
        if (currentSelected) {
            setShippingRate(currentSelected);
        }
        // })
    }, [])


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

        </div>
    )
}