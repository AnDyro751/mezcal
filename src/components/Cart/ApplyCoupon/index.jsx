import {useContext, useState} from 'react';
import {useMutation} from "@apollo/client";
import APPLY_COUPON_CODE_MUTATION from "../../../graphql/mutations/cart/applyCouponCode";
import {useToasts} from "react-toast-notifications";
import {OrderContext} from "../../../stores/userOrder";

export default function ApplyCoupon({currentOrder = {}}) {
    const {addToast} = useToasts();
    const [currentCoupon, setCustomCoupon] = useState("")
    const [state, dispatch] = useContext(OrderContext);


    const [applyCouponCode, {data, loading, error}] = useMutation(APPLY_COUPON_CODE_MUTATION, {
        onCompleted: (data) => {
            console.log(data, "COMPLETED");
            if (data.applyCouponCode.errors.length >= 1) {
                addToast(data.applyCouponCode.errors[0].message, {
                    appearance: 'error'
                });
            } else {
                setCustomCoupon("");
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...data.applyCouponCode.order}});
                console.log(data.applyCouponCode.order)
                addToast('Se ha aplicado el cupón', {
                    appearance: 'success'
                });
            }
        },
        onError: (e) => {
            console.log(e, "ERROR")
            addToast('Ha ocurrido un error al aplicar el cupón', {
                appearance: 'error'
            });
        }
    });

    const handleChange = (e) => {
        setCustomCoupon(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentCoupon.length > 0) {
            applyCouponCode({
                variables: {
                    coupon_code: currentCoupon
                }
            })
        } else {
            addToast('Ingresa un cupón válido', {
                appearance: 'error'
            });
        }

    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex mt-4 space-x-8"
        >
            <div className="w-8/12">
                <input
                    value={currentCoupon}
                    onChange={handleChange}
                    type="text"
                    className="w-full bg-gray-200 focus:outline-none py-3 px-3 rounded"
                    placeholder={"CUPÓN"}
                />
            </div>
            <div
                children="w-4/12">
                <button
                    disabled={currentCoupon.length <= 0}
                    className={`bg-black py-4 px-6 text-white rounded disabled:opacity-50 ${loading || currentCoupon.length <= 0 ? "opacity-50" : ""}`}>
                    Aplicar cupón
                </button>
            </div>
        </form>
    )
}