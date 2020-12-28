import OnePageStepper from "../Stepper";
import InputBase from "../../../Inputs/base";
import {useContext, useEffect, useMemo, useState} from "react";
import {OrderContext} from "../../../../stores/userOrder";

export default function OnePageUserData({handleChangeData, handleBlurData, errors}) {
    const {state, dispatch} = useContext(OrderContext);

    const [fields, setFields] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: ""
    });
    const [newErrors, setErrors] = useState(errors);

    useMemo(() => {
        if (state.order) {
            if (state.order.email) {
                setFields({...fields, email: state.order.email || ""});
            }
        }
    }, [])

    useEffect(() => {
        setErrors(errors);
    }, [errors]);

    const handleChange = (e) => {
        setFields({
            ...fields, [e.target.name]: e.target.value.split(/\s+/)
                .join(' ')
        });
        handleChangeData(e.target.name, e.target.value);
    };

    const handleBlur = (e) => {
        handleBlurData(e.target.name, e.target.value);
    }

    return (
        <div className="w-full">
            <div className="w-full space-y-4">
                <OnePageStepper text={"1. Información de contacto"} open={true}>
                    <div className="w-full space-y-6">
                        <div className="w-full flex items-start space-x-4">
                            <div className="w-6/12">
                                <InputBase
                                    error={newErrors ? newErrors.name : null}
                                    id={"order[name]"}
                                    name={"name"}
                                    label={"Nombre"}
                                    placeholder={"Nombre"}
                                    type={"text"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                    value={fields.name}/>
                            </div>
                            <div className="w-6/12">
                                <InputBase
                                    error={newErrors ? newErrors.lastName : null}
                                    id={"order[lastName]"}
                                    name={"lastName"}
                                    label={"Apellido"}
                                    placeholder={"Apellido"}
                                    type={"text"}
                                    onBlur={handleBlur}

                                    onChange={handleChange}
                                    value={fields.lastName}/>
                            </div>
                        </div>
                        <div className="w-full flex space-x-4">
                            <div className="w-6/12">
                                <InputBase
                                    id={"order[email]"}
                                    name={"email"}
                                    error={newErrors ? newErrors.email : null}
                                    label={"Correo Electrónico"}
                                    placeholder={"Correo Electrónico"}
                                    type={"email"}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={fields.email}/>
                            </div>
                            <div className="w-6/12">
                                <InputBase
                                    error={newErrors ? newErrors.phone : null}
                                    id={"order[phone]"}
                                    name={"phone"}
                                    label={"Teléfono"}
                                    placeholder={"Teléfono"}
                                    onBlur={handleBlur}

                                    type={"text"}
                                    onChange={handleChange}
                                    value={fields.phone}/>
                            </div>
                        </div>
                    </div>
                </OnePageStepper>
            </div>
        </div>
    )
}