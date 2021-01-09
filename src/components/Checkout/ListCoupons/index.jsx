import {useContext} from "react";
import {OrderContext} from "../../../stores/userOrder";
import {useMutation} from "@apollo/client";
import {REMOVE_COUPON_CODE_MUTATION} from "../../../graphql/mutations/cart/applyCouponCode";
import {useToasts} from "react-toast-notifications";

export default function CheckoutListCoupons({}) {
    const {state, dispatch} = useContext(OrderContext);
    const {addToast} = useToasts();

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
            addToast(e.message ? e.message : e, {
                appearance: 'error'
            });
        }
    });

    const handleRemove = (adjustment) => {
        removeCouponCode({
            variables: {
                coupon_code: adjustment.promotionCode.value
            }
        })
    }

    if (state.order.adjustments) {
        return (
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
                {
                    state.order.shipmentAdjustments.nodes &&
                    <div className={"w-full"}>
                        <h3 className="mb-4 text-gray-600 uppercase text-sm font-medium">Descuentos de envío</h3>
                        {state.order.shipmentAdjustments.nodes.map((adjustment, i) => (
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
                        ))}
                    </div>
                }
            </div>
        )
    } else {
        return null
    }
}