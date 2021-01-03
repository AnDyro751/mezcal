import InputBase from "../../../Inputs/base";
import {useContext, useEffect, useState} from "react";
import OnePageStepper from "../Stepper";
import InputBaseSelect from "../../../Inputs/Select";
import {OrderContext} from "../../../../stores/userOrder";

export default function OnePageAddressForm({handleChangeData, handleBlurData, errors, form, country}) {
    const [newErrors, setErrors] = useState(errors);
    const {state, dispatch} = useContext(OrderContext);

    useEffect(() => {
        setErrors(errors);
    }, [errors])
    const handleBlur = (e) => {
        handleBlurData(e.target.name, e.target.value);
        form.handleBlur(e);
    }


    const handleChange = (e) => {
        handleChangeData(e.target.name, e.target.value);
        form.handleChange(e);
    }


    return (
        <div className="w-full space-y-4">
            <OnePageStepper
                text={"Dirección de envío"}
                small={true}
            >
                <div
                    className={`w-full border border-gray-300 rounded`}>
                    <InputBase
                        first
                        error={newErrors ? newErrors.firstname : null}
                        id={"order[firstname]"}
                        name={"firstname"}
                        // label={"Nombre"}
                        placeholder={"Nombre"}
                        type={"text"}
                        onChange={form.handleChange}
                        value={form.values.firstname}
                        onBlur={form.handleBlur}
                    />
                    <InputBase
                        // error={!emptyObject(errors)}
                        error={newErrors ? newErrors.address1 : null}
                        id={"order[address1]"}
                        name={"address1"}
                        //label={"Dirección: Calle y Número ( Incluir número interior )"}
                        placeholder={"Dirección: Calle y Número ( Incluir número interior )"}
                        type={"text"}
                        onChange={handleChange}
                        onBlur={handleBlur}

                        value={form.values.address1}/>
                    <InputBase
                        // error={!emptyObject(errors)}
                        error={newErrors ? newErrors.address2 : null}
                        id={"order[address2]"}
                        name={"address2"}
                        //label={"Colonia"}
                        placeholder={"Colonia"}
                        type={"text"}
                        onBlur={handleBlur}

                        onChange={handleChange}
                        value={form.values.address2}/>

                    <div className="w-full flex items-start divide-x divide-gray-300">
                        <div className="w-6/12">
                            <InputBase
                                id={"order[zipcode]"}
                                name={"zipcode"}
                                // error={!emptyObject(errors)}
                                error={newErrors ? newErrors.zipcode : null}
                                //label={"Código Postal"}
                                placeholder={"Código Postal"}
                                type={"text"}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={form.values.zipcode}/>
                        </div>
                        <div className="w-6/12">
                            <InputBase
                                // error={!emptyObject(errors)}
                                error={newErrors ? newErrors.city : null}
                                id={"order[city]"}
                                name={"city"}
                                //label={"Ciudad"}
                                placeholder={"Ciudad"}
                                type={"text"}
                                onBlur={handleBlur}

                                onChange={handleChange}
                                value={form.values.city}
                            />
                        </div>
                    </div>
                    <InputBaseSelect
                        error={newErrors ? newErrors.stateId : null}
                        id={"order[stateId]"}
                        //label={"Estado"}
                        value={form.values.stateId}
                        name={"stateId"}
                        defaultValue={state.order.billingAddress ? state.order.billingAddress.state ? state.order.billingAddress.state.id : "" : ""}
                        handleChange={handleChange}
                        placeholder={"Selecciona un estado"}
                        options={country.states.nodes}
                    />
                    <InputBaseSelect
                        handleChange={handleChange}
                        id={"order[countryId]"}
                        name={"countryId"}
                        //label={"País"}
                        type={"text"}
                        options={[{id: country.id, name: country.isoName}]}
                        value={form.values.countryId}
                    />
                </div>

            </OnePageStepper>

        </div>
    )
}