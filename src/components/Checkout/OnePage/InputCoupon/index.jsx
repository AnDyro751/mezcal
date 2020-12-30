import InputBase from "../../../Inputs/base";
import {useContext, useEffect, useRef, useState} from "react";
import {useMutation} from "@apollo/client";
import APPLY_COUPON_CODE_MUTATION from "../../../../graphql/mutations/cart/applyCouponCode";
import {useToasts} from "react-toast-notifications";
import {OrderContext} from "../../../../stores/userOrder";

export default function InputCoupon({}) {
    const {state, dispatch} = useContext(OrderContext);

    const [defaultCoupon, setDefaultCoupon] = useState("");
    const [open, setOpen] = useState(false);
    const {addToast} = useToasts()


    const [applyCouponCode, {data, loading, error}] = useMutation(APPLY_COUPON_CODE_MUTATION, {
        onCompleted: (data) => {
            console.log(data, "COMPLETED");
            if (data.applyCouponCode.errors.length >= 1) {
                addToast(data.applyCouponCode.errors[0].message, {
                    appearance: 'error'
                });
            } else {
                setDefaultCoupon("");
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...data.applyCouponCode.order}});
                // console.log(data.applyCouponCode.order)
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
        },
        variables: {
            coupon_code: defaultCoupon
        }
    });

    useEffect(() => {
        if (open) {
            document.querySelector("#order_coupon").focus();
            // console.log();
        }
    }, [open])

    const handleChange = (e) => {
        setDefaultCoupon(e.target.value.split(' ').join('') || "");
    }

    const handleClick = () => {
        setOpen(!open);
    }

    const handleBlur = () => {
        if (defaultCoupon.length <= 0) {
            setOpen(false);
        }
    }

    const handleClickCoupon = () => {
        applyCouponCode();
    }

    return (
        <div className="w-full">
            <div className="w-full py-3 border-t border-b my-3">
                {open ?
                    <InputBase
                        id={"order_coupon"}
                        onBlur={handleBlur}
                        value={defaultCoupon} onChange={handleChange} type={"text"}
                        placeholder={"Agregar código de promoción"}
                        name={"order[coupon]"}
                        className="pr-20"
                        withButton={() => (
                            <button
                                onClick={handleClickCoupon}
                                className={`absolute focus:outline-none top-0 bottom-0 cursor-pointer right-5 flex items-center`}>
                                {loading ?
                                    <svg className="inline animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                         xmlns="http://www.w3.org/2000/svg"
                                         fill="none"
                                         viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#000"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="#000"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    :
                                    <span className="text-xs font-medium text-blue-600">APLICAR</span>

                                }

                            </button>
                        )}
                    />
                    :
                    <span
                        onClick={handleClick}
                        className="text-blue-600 cursor-pointer text-sm font-normal">Agregar código de promoción</span>
                }
            </div>
        </div>
    );
}