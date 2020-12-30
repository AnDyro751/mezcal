import InputBase from "../../../Inputs/base";
import {useEffect, useRef, useState} from "react";

export default function InputCoupon({}) {
    const [defaultCoupon, setDefaultCoupon] = useState("");
    const [open, setOpen] = useState(false);
    const inputRef = useRef();

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
                                className="absolute focus:outline-none top-0 bottom-0 cursor-pointer right-5 flex items-center">
                                <span className="text-xs font-medium text-blue-600">APLICAR</span>
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