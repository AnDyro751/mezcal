import InputBase from "../../../Inputs/base";
import {useState} from "react";
import OnePageStepper from "../Stepper";
import InputBaseSelect from "../../../Inputs/Select";

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
            <OnePageStepper text={"2. Información de envío"} open={false}>
                <div className="w-full space-y-6">
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
                    <div className="w-full flex space-x-4">
                        <div className="w-6/12">
                            <InputBase
                                id={"order[address2]"}
                                name={"address2"}
                                label={"Colonia"}
                                placeholder={"Colonia"}
                                type={"text"}
                                onChange={handleChange}
                                value={fields.address2}/>
                        </div>
                        <div className="w-6/12">

                            <InputBase
                                id={"order[cp]"}
                                name={"cp"}
                                label={"Código Postal"}
                                placeholder={"Código Postal"}
                                type={"text"}
                                onChange={handleChange}
                                value={fields.cp}/>
                        </div>
                    </div>
                    <div className="w-full flex items-center space-x-4">
                        <div className="w-6/12">
                            <InputBase
                                id={"order[city]"}
                                name={"city"}
                                label={"Ciudad"}
                                placeholder={"Ciudad"}
                                type={"text"}
                                onChange={handleChange}
                                value={fields.city}/>
                        </div>
                        <div className="w-6/12">
                            <InputBaseSelect
                                id={"order[country]"}
                                handleChange={() => {
                                }}
                                label={"Estado"}
                                name={"order[state]"}
                                options={[{id: "demo1", name: "Aguascalientes"}]}
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <InputBaseSelect
                            id={"order[country]"}
                            name={"country"}
                            label={"País"}
                            placeholder={"País"}
                            type={"text"}
                            options={[{id: "mx", name: "México"}]}
                            onChange={() => {

                            }}
                            value={fields.countryId}
                        />
                    </div>
                </div>
            </OnePageStepper>
        </div>
    )
}