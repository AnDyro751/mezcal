import ApplyCoupon from "../ApplyCoupon";
import {useContext} from "react";
import {OrderContext} from "../../../stores/userOrder";
import {useMutation} from "@apollo/client";
import {REMOVE_COUPON_CODE_MUTATION} from "../../../graphql/mutations/cart/applyCouponCode";
import {useToasts} from "react-toast-notifications";

export default function CartCouponsInfo({currentOrder = {}}) {
    const [state, dispatch] = useContext(OrderContext);
    const {order} = state;
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
            addToast('Ha ocurrido un error al eliminar el cupón', {
                appearance: 'error'
            });
        }
    });

    const handleRemoveCoupon = (coupon) => {
        removeCouponCode({
            variables: {
                coupon_code: coupon
            }
        })
    }
    return (
        <div className="w-full">
            {
                order.adjustments &&
                order.adjustments.nodes.map((adjustment, i) => (
                    <div
                        key={i}

                        className={`${adjustment.eligible ? "" : "opacity-25"} w-full hover:opacity-100  my-2`}
                        title={`${adjustment.eligible ? "" : "No disponible"}`}>
                        <strong>{adjustment.label}:</strong>&#160;&#160;
                        <span>{adjustment.amount}</span>
                        {
                            adjustment.promotionCode &&
                            <div>
                                <span>Cupón: {adjustment.promotionCode.value}</span>
                                &#160;&#160;<span
                                className="cursor-pointer"
                                onClick={() => handleRemoveCoupon(adjustment.promotionCode.value)}>-Eliminar-</span>
                            </div>
                        }
                    </div>
                ))
            }
            <ApplyCoupon order={order}/>
        </div>
    )
}