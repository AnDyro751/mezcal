import InputBase from "../../Inputs/base";
import {useContext, useEffect, useState} from 'react';
import {OrderContext} from "../../../stores/userOrder";
import {useMutation} from "@apollo/client";
import ADD_EMAIL_TO_ORDER from "../../../graphql/mutations/cart/addEmailToOrder";
import {useToasts} from "react-toast-notifications";

export default function SetEmailInput({}) {
    const {state, dispatch} = useContext(OrderContext);
    const [currentEmail, setCurrentEmail] = useState("");
    const {addToast} = useToasts();

    const [setOrderEmail, {data, loading, error}] = useMutation(ADD_EMAIL_TO_ORDER, {
        variables: {
            email: currentEmail
        },
        onCompleted: (data) => {
            if (data.setOrderEmail.errors.length > 0) {
                addToast(data.setOrderEmail.errors[0].message, {
                    appearance: 'error'
                });
            } else {
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...data.setOrderEmail.order}});
                addToast('Email actualizado', {
                    appearance: 'success'
                });
            }
        },
        onError: (e) => {
            addToast(e.message ? e.message : e, {
                appearance: 'error'
            });
        }
    })
    useEffect(() => {
        setCurrentEmail(state.order.email);
    }, [state.order]);

    const handleBlur = (e) => {
        if (state) {
            if (state.order) {
                if (state.order.email !== currentEmail) {
                    if (currentEmail.length > 1) {
                        setOrderEmail()
                    }
                    console.log("INDISTINTO")
                } else {
                    console.log("DISTINTO")
                }
            }
        }
    }
    return (
        <div className="w-full">
            <InputBase
                onBlur={handleBlur}
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
    );
}