import OnePageListProducts from "./ListProducts";
import OnePageAddressForm from "./AddressForm";
import OnePageListProductsLoader from "./Loaders/ListProductsLoader";
import OnePageDataCheckout from "./Data";
import OnePageUserData from "./UserData";
import {useContext, useMemo, useState} from "react";
import {useToasts} from "react-toast-notifications";
import validator from "email-validator";
import {useMutation, useQuery} from "@apollo/client";
import ADD_EMAIL_TO_ORDER from "../../../graphql/mutations/cart/addEmailToOrder";
import {OrderContext} from "../../../stores/userOrder";
import OnePageDelivery from "./Delivery";
import {useFormik} from "formik";
import CHECKOUT_PAGE_QUERY from "../../../graphql/queries/pages/checkout";
import phone from 'phone';

export default function ComponentsCheckoutOnePage({}) {
    const {addToast} = useToasts();
    const {state, dispatch} = useContext(OrderContext);
    const {data: dataCountry, loading: loadingCountry, error: errorCountry} = useQuery(CHECKOUT_PAGE_QUERY, {
        variables: {
            isoCode: "MX"
        }
    });
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

        if (!values.phone) {
            errors.phone = 'Campo requerido';
        } else if (phone(values.phone, 'MEX').length === 0) {
            errors.phone = 'Ingresa un valor correcto';
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
        },
        validate,
        onSubmit: values => {
            if (formik.values.email !== state.order.email) {
                addEmailToOrder().then(() => {
                    console.log("ACTUALIZAR 1")
                }).catch((e) => {
                    console.log("ERROR", e)
                });
            } else {
                console.log("ACTUALIZAR 2")
            }
            alert(JSON.stringify(values, null, 2));
        },
    });

    const [addEmailToOrder, {data: dataEmailToOrder, loading: loadingEmailToOrder}] = useMutation(ADD_EMAIL_TO_ORDER, {
        variables: {
            email: formik.values.email
        },
        onCompleted: (newDataEmailToOrder) => {
            console.log("COMPLETE");
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

    const onHandleChangeData = (fieldName, fieldValue) => {
        if (newErrors[fieldName] != null) {
            setErrors({...newErrors, [fieldName]: null});
        }
    }

    const handleSubmit = (e) => {
        formik.handleSubmit(e);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-10/12 justify-between mx-auto flex mt-10 space-x-6">
            <div className="w-8/12 space-y-8">
                <OnePageUserData
                    form={formik}
                    handleChangeData={onHandleChangeData}
                    handleBlurData={() => {
                    }}
                    errors={formik.errors}
                />
                {
                    !loadingCountry && !errorCountry &&
                    <>
                        <OnePageAddressForm
                            form={formik}
                            handleBlurData={() => {
                            }}
                            country={dataCountry.countryByIso}
                            handleChangeData={onHandleChangeData}
                            errors={formik.errors}
                        />
                        <OnePageDelivery/>
                    </>
                }
            </div>
            <div className="w-4/12">
                <OnePageDataCheckout/>
            </div>
            <input type="submit" value={"Enviar"}/>
            {/*<button className="" >Enviar</button>*/}
        </form>
    )
}