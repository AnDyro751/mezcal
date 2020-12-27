import OnePageStepper from "../Stepper";
import InputBase from "../../../Inputs/base";
import {useState} from "react";

export default function OnePageUserData({}) {
    const [fields, setFields] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: ""
    });

    const handleChange = (e) => {
        setFields({...fields, [e.target.name]: e.target.value});
    };

    return (
        <div className="w-full">
            <div className="w-full space-y-4">
                <OnePageStepper text={"1. Información de contacto"} open={true}>
                    <div className="w-full space-y-6">
                        <div className="w-full flex items-center space-x-4">
                            <div className="w-6/12">
                                <InputBase
                                    id={"order[name]"}
                                    name={"name"}
                                    label={"Nombre"}
                                    placeholder={"Nombre"}
                                    type={"text"}
                                    onChange={handleChange}
                                    value={fields.name}/>
                            </div>
                            <div className="w-6/12">
                                <InputBase
                                    id={"order[lastName]"}
                                    name={"lastName"}
                                    label={"Apellido"}
                                    placeholder={"Apellido"}
                                    type={"text"}
                                    onChange={handleChange}
                                    value={fields.lastName}/>
                            </div>
                        </div>
                        <div className="w-full flex space-x-4">
                            <div className="w-6/12">
                                <InputBase
                                    id={"order[email]"}
                                    name={"email"}
                                    label={"Correo Electrónico"}
                                    placeholder={"Correo Electrónico"}
                                    type={"email"}
                                    onChange={handleChange}
                                    value={fields.email}/>
                            </div>
                            <div className="w-6/12">
                                <InputBase
                                    id={"order[phone]"}
                                    name={"phone"}
                                    label={"Teléfono"}
                                    placeholder={"Teléfono"}
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