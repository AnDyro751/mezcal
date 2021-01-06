import InputBase from "../../../Inputs/base";
import {useContext, useEffect, useState} from "react";
import OnePageStepper from "../Stepper";
import InputBaseSelect from "../../../Inputs/Select";
import {OrderContext} from "../../../../stores/userOrder";
import {useMutation} from "@apollo/client";
import ADD_ADDRESS_TO_CHECKOUT_MUTATION from "../../../../graphql/mutations/cart/addAddressToCheckout";
import UPDATE_STATE_ORDER_MUTATION from "../../../../graphql/mutations/cart/updateStateOrder";
import {useToasts} from "react-toast-notifications";

export default function OnePageAddressForm({handleChangeData, handleBlurData, errors, form, country}) {
    const [newErrors, setErrors] = useState(errors);
    const {state, dispatch} = useContext(OrderContext);
    const {addToast} = useToasts()


    const [updateState, {data, loading, error}] = useMutation(UPDATE_STATE_ORDER_MUTATION, {
        onCompleted: (newData) => {
            // console.log(newData);
            if (newData.updateStateOrder) {
                let newOrder = {...state.order, shipments: newData.updateStateOrder.shipments}
                console.log(newOrder);
                dispatch({
                    type: "UPDATE_ORDER",
                    payload: newOrder
                });
                console.log("Pasó");
            } else {

                addToast('Ha ocurrido un error, intenta de nuevo', {
                    appearance: 'error',
                })
                console.log("Ha ocurrido un error");
            }
        },
        onError: (e) => {
            addToast(e.message ? e.message : e, {
                appearance: 'error',
            })
            console.log("ERROR", e)
        }
    });


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

    const handleChangeState = (e) => {
        handleChange(e);
        dispatch({type: "UPDATE_ORDER", payload: {...state.order, shipments: {nodes: []}}});
        updateState({
            variables: {
                stateId: e.target.value
            }
        })
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
                        handleChange={handleChangeState}
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