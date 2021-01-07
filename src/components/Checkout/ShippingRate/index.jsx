import {useState, useEffect, useContext} from 'react';
import {useMutation} from "@apollo/client";
import SELECT_SHIPPING_RATE from "../../../graphql/mutations/cart/selectShippingRate";
import Router from "next/router";
import {useToasts} from "react-toast-notifications";
import {OrderContext} from "../../../stores/userOrder";
import NEXT_STATE_MUTATION from "../../../graphql/mutations/cart/nextState";

export default function ComponentsCheckoutShippingRate({shippingRate = {}, checked = false, handleSelect, shipping}) {
    const {addToast} = useToasts()
    const {state, dispatch} = useContext(OrderContext);

    const [checkedInput, setChecked] = useState(shippingRate.selected || false);
    useEffect(() => {
        setChecked(checked);
    }, [checked]);

    const [toNextState, {data: dataNextState, loading: loadingNextState, error: errorNextState}] = useMutation(NEXT_STATE_MUTATION, {
        onCompleted: (newData) => {
            if (newData.nextCheckoutState.errors.length > 0) {
                addToast(newData.nextCheckoutState.errors[0].message, {
                    appearance: "error"
                })
            } else {
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...newData.nextCheckoutState.order}});
            }
        }
    })


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
                if (dataCompleted.selectShippingRate.order.state === "delivery") {
                    toNextState();
                } else {
                    dispatch({
                        type: "UPDATE_ORDER",
                        payload: {...state.order, ...dataCompleted.selectShippingRate.order}
                    });
                }
                // addToast("Método de envío seleccionado", {
                //     appearance: 'success'
                // })
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
            className={`w-full hover:border-black select-none p-3 space-x-4 rounded border-2 cursor-pointer flex ${checkedInput ? "border-black" : "border-gray-300"}`}
        >
            {/*<div className="w-4">*/}
            {/*    <input type="radio"*/}
            {/*        // name={`${shipping.id}["delivery"]`}*/}
            {/*           checked={checkedInput}*/}
            {/*           onChange={(e) => {*/}
            {/*               // setChecked(true);*/}
            {/*               selectShippingRate()*/}
            {/*           }}*/}
            {/*    />*/}
            {/*</div>*/}
            <div className="w-full flex items-center">
                <div className="w-8/12">
                                            <span className={`text-gray-700 ${checkedInput ? "font-medium" : "font-normal"}`}>
                                                {shippingRate.shippingMethod.name}
                                                {/*{shippingRate.id}*/}
                                            </span>
                </div>
                <div className="w-4/12 flex justify-end">
                    <span className="font-medium text-sm">({shippingRate.cost}) {shippingRate.currency}</span>
                </div>
            </div>
        </div>
    )
}