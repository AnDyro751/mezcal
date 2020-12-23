import {useState, useEffect} from 'react';
import {useMutation} from "@apollo/client";
import SELECT_SHIPPING_RATE from "../../../graphql/mutations/cart/selectShippingRate";
import Router from "next/router";
import {useToasts} from "react-toast-notifications";

export default function ComponentsCheckoutShippingRate({shippingRate = {}, checked = false, handleSelect, shipping}) {
    const {addToast} = useToasts()

    const [checkedInput, setChecked] = useState(shippingRate.selected || false);
    useEffect(() => {
        setChecked(checked);
    }, [checked])

    const [selectShippingRate, {data, loading, error}] = useMutation(SELECT_SHIPPING_RATE, {
        variables: {
            input: {
                shippingRateId: shippingRate.id
            }
        },
        onCompleted: (dataCompleted) => {
            if (dataCompleted.selectShippingRate.errors.length > 0) {
                addToast(dataCompleted.selectShippingRate.errors[0].message, {
                    appearance: 'error'
                })
            } else {
                handleSelect(shippingRate.id)
                setChecked(true);
                addToast("Método de envío seleccionado", {
                    appearance: 'success'
                })
                // Router.push("/payment")
            }
        }
    });

    return (
        <div
            onClick={() => {
                // setChecked(true);
                selectShippingRate()
                // if (checkedInput) {
                //     handleSelect("");
                // } else {
                // handleSelect(shippingRate.id);
                // }
            }}
            className="w-full select-none p-3 space-x-4 rounded border cursor-pointer border-gray-300 flex"
        >
            <div className="w-4">
                <input type="radio"
                       // name={`${shipping.id}["delivery"]`}
                       checked={checkedInput}
                       onChange={(e) => {
                           // setChecked(true);
                           selectShippingRate()
                       }}
                />
            </div>
            <div className="w-11/12 flex items-center">
                <div className="w-8/12">
                                            <span className="text-gray-700 font-normal">
                                                {shippingRate.shippingMethod.name}
                                            </span>
                </div>
                <div className="w-4/12 flex justify-end">
                    <span className="font-medium text-sm">({shippingRate.cost}) {shippingRate.currency}</span>
                </div>
            </div>
        </div>
    )
}