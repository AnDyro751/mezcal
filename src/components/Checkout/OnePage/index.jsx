import OnePageListProducts from "./ListProducts";
import OnePageAddressForm from "./AddressForm";
import OnePageListProductsLoader from "./Loaders/ListProductsLoader";
import OnePageDataCheckout from "./Data";
import OnePageUserData from "./UserData";
import {useContext, useMemo, useState} from "react";
import {useToasts} from "react-toast-notifications";
import validator from "email-validator";
import {useMutation} from "@apollo/client";
import ADD_EMAIL_TO_ORDER from "../../../graphql/mutations/cart/addEmailToOrder";
import {OrderContext} from "../../../stores/userOrder";
import OnePageDelivery from "./Delivery";


export default function ComponentsCheckoutOnePage({}) {
    const {addToast} = useToasts();
    const {state, dispatch} = useContext(OrderContext);
    const INIT_ERRORS = {
        email: null,
        phone: null,
        name: null,
        lastName: null,
        address1: null,
        address2: null,
        cp: null,
        city: null,
        stateId: null,
    }

    const [fields, setFields] = useState({
        email: "",
        phone: "",
        name: "",
        lastName: "",
        address1: "",
        address2: "",
        cp: "",
        city: "",
        stateId: "",
    });
    const [errors, setErrors] = useState(INIT_ERRORS);


    useMemo(() => {
        if (state.order) {
            if (state.order.email) {
                setFields({...fields, email: state.order.email});
            }
        }
    }, [])


    const [addEmailToOrder, {data: dataEmailToOrder}] = useMutation(ADD_EMAIL_TO_ORDER, {
        variables: {
            email: fields.email
        },
        onCompleted: (newDataEmailToOrder) => {
            if (newDataEmailToOrder.setOrderEmail.errors.length > 0) {
                setErrors({...errors, email: newDataEmailToOrder.setOrderEmail.errors[0].message});
                addToast(newDataEmailToOrder.setOrderEmail.errors[0].message, {
                    appearance: 'error',
                });
            } else {
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...newDataEmailToOrder.setOrderEmail.order}});
            }
        }
    });


    const onHandleChangeData = (name, value) => {
        if (fields[name] != null) {
            setErrors({...errors, [name]: null});
        }
        setFields({...fields, [name]: value});
    };


    const validateEmail = () => {
        if (fields.email) {
            if (validator.validate(fields.email)) {
            } else {
                setErrors({...errors, email: 'Ingresa un correo electrónico válido'});
            }
        } else {
            setErrors({...errors, email: 'Ingresa un correo electrónico'});
        }
    }

    const onHandleBlurData = (name, value) => {
        // console.log(fields[name])
        if (name === "email") {
            if (validateEmail()) {
                if (state.order.email !== fields.email) {
                    addEmailToOrder();
                }
            }
        } else {
            validateString(name, value);
        }
    };

    const validateString = (fieldName, fieldValue) => {
        if (fieldValue) {
            if (fieldValue.length > 0) {
                if (fieldValue.length >= 80) {
                    setErrors({...errors, [fieldName]: 'Ingresa un valor correcto'});
                }
            } else {
                setErrors({...errors, [fieldName]: 'Ingresa un valor correcto'});
            }
        } else {
            setErrors({...errors, [fieldName]: 'Ingresa un valor correcto'});
        }
    }

    const validateAllStrings = async () => {
        validateEmail();
        let newErrors = errors;
        let fieldsValues = Object.values(fields);
        Object.keys(fields).map((el, i) => {
            if (fieldsValues[i].split(/\s+/).join(' ').length <= 0) {
                newErrors[el] = "Ingresa un valor correcto";
            }
        })
        setErrors({...errors, ...newErrors});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await validateAllStrings();
        // console.log(Object.values(errors).findIndex((el) => el != null))
        if (Object.values(errors).findIndex((el) => el !== null) !== -1) {
            console.log("HYA CAMP", errors)
        } else {
            // No hay ningún campo null, no hay errores
            alert("TODOS LOS CAMPOS SON CORRECTOS")
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-10/12 justify-between mx-auto flex mt-10 space-x-6">
            <div className="w-8/12 space-y-8">
                <OnePageUserData
                    handleBlurData={onHandleBlurData}
                    errors={errors}
                    handleChangeData={onHandleChangeData}
                />
                <OnePageAddressForm
                    handleBlurData={onHandleBlurData}
                    errors={errors}
                    handleChangeData={onHandleChangeData}/>
                <OnePageDelivery/>
            </div>
            <div className="w-4/12">
                <OnePageDataCheckout/>
            </div>
            <input type="submit" value={"Enviar"}/>
            {/*<button className="" >Enviar</button>*/}
        </form>
    )
}