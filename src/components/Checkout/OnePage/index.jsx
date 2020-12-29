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
import {useFormik} from "formik";


export default function ComponentsCheckoutOnePage({}) {
    const {addToast} = useToasts();
    const {state, dispatch} = useContext(OrderContext);
    const INIT_ERRORS = {
        email: null,
        phone: null,
        firstName: null,
        lastName: null,
        address1: null,
        address2: null,
        cp: null,
        city: null,
        stateId: null,
    }

    // const [fields, setFields] = useState({
    //     email: "",
    //     phone: "",
    //     firstName: "",
    //     lastName: "",
    //     address1: "",
    //     address2: "",
    //     cp: "",
    //     city: "",
    //     stateId: "",
    // });


    const [newErrors, setErrors] = useState(INIT_ERRORS);


    const validate = values => {
        const errors = {};
        if (!values.firstName) {
            errors.firstName = 'Campo requerido';
        } else if (values.firstName.length > 70) {
            errors.firstName = 'Ingresa un nombre más pequeño';
        }

        if (!values.lastName) {
            errors.lastName = 'Campo requerido';
        } else if (values.lastName.length > 70) {
            errors.lastName = 'Ingresa un apellido más pequeño';
        }

        if (!values.email) {
            errors.email = 'Campo requerido';
        } else if (!validator.validate(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.address1) {
            errors.address1 = 'Campo requerido';
        } else if (values.lastName.length > 100) {
            errors.lastName = 'Ingresa una dirección más corta';
        }

        if (values.address2) {
            if (values.address2.length > 100) {
                errors.address2 = "Ingresa un valor más corto";
            }
        }

        if (!values.cp) {
            errors.cp = "Campo requerido"
        } else if (values.cp.length !== 5) {
            errors.cp = "Código postal incorrecto";
        }

        if (!values.city) {
            errors.city = "Campo requerido"
        } else if (values.city.length > 50) {
            errors.city = "Ingresa un valor más corto";
        }

        if (!values.stateId) {
            errors.stateId = "Campo requerido"
        }

        if (!values.countryId) {
            errors.countryId = "Campo requerido"
        }

        return errors;
    };


    const formik = useFormik({
        initialValues: {
            email: state.order ? state.order.email : "",
            phone: "",
            firstName: "",
            lastName: "",
            address1: "",
            address2: "",
            cp: "",
            city: "",
            stateId: "",
            countryId: ""
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const [addEmailToOrder, {data: dataEmailToOrder}] = useMutation(ADD_EMAIL_TO_ORDER, {
        variables: {
            email: formik.values.email
        },
        onCompleted: (newDataEmailToOrder) => {
            if (newDataEmailToOrder.setOrderEmail.errors.length > 0) {
                formik.errors.email = newDataEmailToOrder.setOrderEmail.errors[0].message
                // setErrors({...newErrors, email: newDataEmailToOrder.setOrderEmail.errors[0].message});
                addToast(newDataEmailToOrder.setOrderEmail.errors[0].message, {
                    appearance: 'error',
                });
            } else {
                formik.errors.email = null;
                // setErrors({...newErrors, email: null});
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...newDataEmailToOrder.setOrderEmail.order}});
            }
        }
    });

    const reAssignEmail = () => {
        if (formik.values.email !== state.order.email) {
            if (!formik.errors.email) {
                addEmailToOrder();
            }
        }
    }

    const onHandleBlurData = (fieldName, fieldValue) => {
        if (fieldName === "email") {
            reAssignEmail();
        }
    }

    const onHandleChangeData = (fieldName, fieldValue) => {
        if (newErrors[fieldName] != null) {
            setErrors({...newErrors, [fieldName]: null});
        }
    }

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="w-10/12 justify-between mx-auto flex mt-10 space-x-6">
            <div className="w-8/12 space-y-8">
                <OnePageUserData
                    form={formik}
                    handleChangeData={onHandleChangeData}
                    handleBlurData={onHandleBlurData}
                    errors={formik.errors}
                />
                <OnePageAddressForm
                    form={formik}
                    handleBlurData={onHandleBlurData}
                    handleChangeData={onHandleChangeData}
                    errors={formik.errors}
                />
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