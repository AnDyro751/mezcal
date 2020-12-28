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
    countryId: null
}
export default function ComponentsCheckoutOnePage({}) {
    const {addToast} = useToasts();
    const {state, dispatch} = useContext(OrderContext);

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
        countryId: ""
    });

    useMemo(() => {
        if (state.order) {
            if (state.order.email) {
                setFields({...fields, email: state.order.email});
            }
        }
    }, [])

    const [errors, setErrors] = useState(INIT_ERRORS);

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
        setErrors(INIT_ERRORS)
        setFields({...fields, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validEmail = validateEmail();
    };

    const validateEmail = () => {
        if (fields.email) {
            if (validator.validate(fields.email)) {
                return true;
            } else {
                setErrors({...errors, email: 'Ingresa un correo electrónico válido'});
                return false;
            }
        } else {
            setErrors({...errors, email: 'Ingresa un correo electrónico'});
            return false;
        }
        return false;
    }

    const onHandleBlurData = (name, value) => {
        if (name === "email") {
            if (validateEmail()) {
                if (state.order.email !== fields.email) {
                    addEmailToOrder();
                }
            }
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
                <OnePageAddressForm handleChangeData={onHandleChangeData}/>
            </div>
            <div className="w-4/12">
                <OnePageDataCheckout/>
            </div>
        </form>
    )
}