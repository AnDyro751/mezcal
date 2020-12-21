import withApollo from "../../../lib/apollo";
import ComponentsCheckoutShippingRate from "../ShippingRate";
import {useState} from 'react';
import ButtonsPrimary from "../../Buttons/primary";
import {useMutation} from "@apollo/client";
import SELECT_SHIPPING_RATE from "../../../graphql/mutations/cart/selectShippingRate";
import {useToasts} from "react-toast-notifications";
import {useMemo} from 'react';
import Router from 'next/router';

function ComponentCheckoutDelivery({currentOrder = {}}) {
    const [shippingRateSelected, setShippingRate] = useState("");
    const {addToast} = useToasts()

    useMemo(() => {
        currentOrder.shipments.nodes.map((shipment) => {
            let currentSelected = shipment.shippingRates.nodes.find((el) => el.selected === true);
            if (currentSelected) {
                setShippingRate(currentSelected.id);
                return;
            }
        })
    }, [])

    const [selectShippingRate, {data, loading, error}] = useMutation(SELECT_SHIPPING_RATE, {
        variables: {
            input: {
                shippingRateId: shippingRateSelected
            }
        },
        onCompleted: (dataCompleted) => {
            if (dataCompleted.selectShippingRate.errors.length > 0) {
                addToast(dataCompleted.selectShippingRate.errors[0].message, {
                    appearance: 'error'
                })
            } else {
                Router.push("/payment")
            }
        }
    });
    const handleClick = () => {
        if (shippingRateSelected.length > 0) {
            selectShippingRate()
        } else {
            addToast('Selecciona un envío', {
                appearance: 'error'
            })
        }
    }
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
                    <ButtonsPrimary
                        onClick={handleClick}
                        disabled={shippingRateSelected.length <= 1}
                        loading={loading}
                        text={"Continuar con el pago"} customClass="w-full text-center flex justify-center"/>
                </div>
            </div>
        </div>
    )
}

export default withApollo({ssrc: true})(ComponentCheckoutDelivery)