import InputBase from "../../Inputs/base";
import {useContext, useEffect, useState} from 'react';
import {OrderContext} from "../../../stores/userOrder";

export default function SetEmailInput({}) {
    const [state, dispatch] = useContext(OrderContext);
    const [currentEmail, setCurrentEmail] = useState("");
    useEffect(() => {
        setCurrentEmail(state.order.email);
    }, [state.order])
    return (
        <div className="w-full">
            <InputBase
                onChange={(e) => {
                    setCurrentEmail(e.target.value)
                }}
                placeholder={"Correo electrónico"}
                value={currentEmail || ""}
                id={"order[mail]"}
                label={"Correo Electrónico"}
                type={"text"}
            />
        </div>
    )
}