import InputBase from "../../../Inputs/base";
import {useEffect, useState} from "react";
import OnePageStepper from "../Stepper";
import InputBaseSelect from "../../../Inputs/Select";

export default function OnePageAddressForm({handleChangeData, handleBlurData, errors}) {
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
    const [newErrors, setErrors] = useState(errors);

    useEffect(() => {
        setErrors(errors);
    }, [errors])
    const handleChange = (e) => {
        setFields({...fields, [e.target.name]: e.target.value});
        handleChangeData(e.target.name, e.target.value);
    };

    const handleBlur = (e) => {
        handleBlurData(e.target.name, e.target.value);
    }

    return (
        <div className="w-full space-y-4">
            <OnePageStepper text={"2. Información de envío"} open={false}>
                <div className="w-full space-y-6">
                    <div className="w-full">
                        <InputBase
                            error={newErrors ? newErrors.address1 : null}
                            id={"order[address1]"}
                            name={"address1"}
                            label={"Dirección: Calle y Número ( Incluir número interior )"}
                            placeholder={"Dirección: Calle y Número ( Incluir número interior )"}
                            type={"text"}
                            onChange={handleChange}
                            onBlur={handleBlur}

                            value={fields.address1}/>
                    </div>
                    <div className="w-full flex space-x-4">
                        <div className="w-6/12">
                            <InputBase
                                error={newErrors ? newErrors.address2 : null}
                                id={"order[address2]"}
                                name={"address2"}
                                label={"Colonia"}
                                placeholder={"Colonia"}
                                type={"text"}
                                onBlur={handleBlur}

                                onChange={handleChange}
                                value={fields.address2}/>
                        </div>
                        <div className="w-6/12">

                            <InputBase
                                id={"order[cp]"}
                                name={"cp"}
                                error={newErrors ? newErrors.cp : null}
                                label={"Código Postal"}
                                placeholder={"Código Postal"}
                                type={"text"}
                                onBlur={handleBlur}

                                onChange={handleChange}
                                value={fields.cp}/>
                        </div>
                    </div>
                    <div className="w-full flex items-start space-x-4">
                        <div className="w-6/12">
                            <InputBase
                                error={newErrors ? newErrors.city : null}
                                id={"order[city]"}
                                name={"city"}
                                label={"Ciudad"}
                                placeholder={"Ciudad"}
                                type={"text"}
                                onBlur={handleBlur}

                                onChange={handleChange}
                                value={fields.city}/>
                        </div>
                        <div className="w-6/12">
                            <InputBaseSelect
                                error={newErrors ? newErrors.stateId : null}
                                id={"order[state]"}
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
                            error={newErrors ? newErrors.countryId : null}
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