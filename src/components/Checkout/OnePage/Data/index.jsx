import {useContext, useEffect, useMemo, useState} from "react";
import {OrderContext} from "../../../../stores/userOrder";
import CheckoutShippingSelected from "../../ShippingSelected";
import ButtonsPrimary from "../../../Buttons/primary";
import {useToasts} from "react-toast-notifications";
import {useMutation} from "@apollo/client";
import {REMOVE_COUPON_CODE_MUTATION} from "../../../../graphql/mutations/cart/applyCouponCode";
import NEXT_STATE_MUTATION from "../../../../graphql/mutations/cart/nextState";

export default function OnePageDataCheckout({shipments, currentOrder}) {
    const {state, dispatch} = useContext(OrderContext);
    const {addToast} = useToasts();

    const [toNext, {loading: loadingNext}] = useMutation(NEXT_STATE_MUTATION, {
        onCompleted: (newData) => {
            if (newData.nextCheckoutState.errors.length >= 1) {
                addToast(newData.nextCheckoutState.errors[0].message, {
                    appearance: 'error'
                });
            } else {
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...newData.nextCheckoutState.order}});
            }
        }
    });

    const [removeCouponCode, {data, loading, error}] = useMutation(REMOVE_COUPON_CODE_MUTATION, {
        onCompleted: (data) => {
            console.log(data, "COMPLETED");
            if (data.removeCouponCode.errors.length >= 1) {
                addToast(data.removeCouponCode.errors[0].message, {
                    appearance: 'error'
                });
            } else {
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...data.removeCouponCode.order}});
                addToast('Se ha removido el cupón', {
                    appearance: 'success'
                });
            }
        },
        onError: (e) => {
            console.log(e, "ERROR")
            addToast('Ha ocurrido un error al eliminar el cupón', {
                appearance: 'error'
            });
        }
    });


    const handleClick = () => {
        if (state.order.state === "cart") {
            toNext();
        }
    }

    const handleRemove = (adjustment) => {
        removeCouponCode({
            variables: {
                coupon_code: adjustment.promotionCode.value
            }
        })
    }

    return (
        <div className="w-full">
            <p>
                Current step: <strong>{state.order.state}</strong>
            </p>
            {
                state.order.state === "address" &&
                <input type="submit" value={"Enviar"} form={"addressForm"}/>
            }

            {
                shipments.map((shipment, i) => (
                    <CheckoutShippingSelected key={i} shipping={shipment}/>
                ))
            }
            {
                state.order.adjustments &&
                <div className="w-full my-4 space-y-4">
                    {
                        state.order.adjustments.nodes &&
                        state.order.adjustments.nodes.map((adjustment, i) => (
                            <div
                                title={`${adjustment.eligible ? "" : "No aplica"}`}
                                className={`${adjustment.eligible ? "" : "opacity-50"} ${adjustment.eligible ? "" : "line-through"} w-full flex items-center justify-between`}
                                key={i}>
                                <div
                                    className="bg-gray-200 font-normal text-gray-800 w-auto px-5 py-2 rounded uppercase">
                                    {adjustment.promotionCode.value}
                                    <span
                                        onClick={() => {
                                            handleRemove(adjustment)
                                        }}
                                        className="hover:text-black text-gray-500 cursor-pointer">&#160;&#160;x</span>
                                </div>
                                <div className="w-auto">
                                    <span
                                        className={`text-gray-500 text-sm`}>{adjustment.amount} {state.order.currency}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }

            {
                state.order.state === "cart" &&

                <ButtonsPrimary
                    loading={loadingNext}
                    onClick={handleClick}
                    text={"Siguiente"}
                />
            }

        </div>
    );
}