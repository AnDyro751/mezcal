import InputBase from "../../../Inputs/base";
import {useState} from "react";
import OnePageStepper from "../Stepper";

export default function OnePageAddressForm({}) {
    const [fields, setFields] = useState({
        name: "",
        lastName: "",
        address1: "",
        address2: "",
        cp: "",
        city: "",
        stateId: "",
        countryId: "",
        phone: ""
    })
    const handleChange = (e) => {
        setFields({...fields, [e.target.name]: e.target.value})
    };

    return (
        <div className="w-full space-y-4">
            <OnePageStepper text={"1. Información de envío"} open={false}>
                <>
                    <div className="w-full">
                        <InputBase
                            id={"order[name]"}
                            name={"name"}
                            label={"Nombre"}
                            placeholder={"Nombre"}
                            type={"text"}
                            onChange={handleChange}
                            value={fields.name}/>
                    </div>
                    <div className="w-full">
                        <InputBase
                            id={"order[lastName]"}
                            name={"lastName"}
                            label={"Apellido"}
                            placeholder={"Apellido"}
                            type={"text"}
                            onChange={handleChange}
                            value={fields.lastName}/>
                    </div>
                    <div className="w-full">
                        <InputBase
                            id={"order[address1]"}
                            name={"address1"}
                            label={"Dirección: Calle y Número ( Incluir número interior )"}
                            placeholder={"Dirección: Calle y Número ( Incluir número interior )"}
                            type={"text"}
                            onChange={handleChange}
                            value={fields.address1}/>
                    </div>
                    <div className="w-full">
                        <InputBase
                            id={"order[address2]"}
                            name={"address2"}
                            label={"Colonia"}
                            placeholder={"Colonia"}
                            type={"text"}
                            onChange={handleChange}
                            value={fields.address2}/>
                    </div>
                    <div className="w-full">
                        <InputBase
                            id={"order[cp]"}
                            name={"cp"}
                            label={"Código Postal"}
                            placeholder={"Código Postal"}
                            type={"text"}
                            onChange={handleChange}
                            value={fields.cp}/>
                    </div>
                    <div className="w-full">
                        <InputBase
                            id={"order[city]"}
                            name={"city"}
                            label={"Ciudad"}
                            placeholder={"Ciudad"}
                            type={"text"}
                            onChange={handleChange}
                            value={fields.city}/>
                    </div>
                    <div className="w-full">
                        <InputBase
                            id={"order[phone]"}
                            name={"phone"}
                            label={"Teléfono"}
                            placeholder={"Teléfono"}
                            type={"text"}
                            onChange={handleChange}
                            value={fields.phone}/>
                    </div>
                </>
            </OnePageStepper>
        </div>
    )
}