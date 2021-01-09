import OnePageAddressForm from "./AddressForm";
import OnePageDataCheckout from "./Data";
import OnePageUserData from "./UserData";
import {useContext, useRef} from "react";
import {useToasts} from "react-toast-notifications";
import {useMutation} from "@apollo/client";
import ADD_EMAIL_TO_ORDER from "../../../graphql/mutations/cart/addEmailToOrder";
import {OrderContext} from "../../../stores/userOrder";
import OnePageDelivery from "./Delivery";
import {useFormik} from "formik";
import validate from "./validateValues";
import ADD_ADDRESS_TO_CHECKOUT_MUTATION from "../../../graphql/mutations/cart/addAddressToCheckout";
import CheckoutOnePagePayment from "./Payment";
import NEXT_STATE_MUTATION from "../../../graphql/mutations/cart/nextState";
import {isEqual} from 'lodash';

export default function ComponentsCheckoutOnePage({dataCountry}) {
    const {addToast} = useToasts();
    const formRef = useRef();
    const {state, dispatch} = useContext(OrderContext);

    const [toNext, {loading: loadingNext}] = useMutation(NEXT_STATE_MUTATION, {
        onCompleted: (newData) => {
            if (newData.nextCheckoutState.errors.length >= 1) {
                addToast(newData.nextCheckoutState.errors[0].message, {
                    appearance: 'error'
                });
            } else {
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...newData.nextCheckoutState.order}});
            }
        }
    });


    const formik = useFormik({
        initialValues: {
            email: state.order ? state.order.email : "",
            phone: state.order ? state.order.billingAddress ? state.order.billingAddress.phone : "" : "",
            firstname: state.order ? state.order.billingAddress ? state.order.billingAddress.firstname : "" : "",
            address1: state.order ? state.order.billingAddress ? state.order.billingAddress.address1 : "" : "",
            address2: state.order ? state.order.billingAddress ? state.order.billingAddress.address2 : "" : "",
            zipcode: state.order ? state.order.billingAddress ? state.order.billingAddress.zipcode : "" : "",
            city: state.order ? state.order.billingAddress ? state.order.billingAddress.city : "" : "",
            stateId: state.order ? state.order.billingAddress ? state.order.billingAddress.state ? state.order.billingAddress.state.id : "" : "" : ""
        },
        validate,
        onSubmit: values => {
            handleSendAllForm();
            // console.log("HOLA")
            // alert(JSON.stringify(values, null, 2));
        },
    });

    const [addAddressToOrder, {data: dataAddressToOrder, loading: loadingToOrder, error: errorToOrder}] = useMutation(ADD_ADDRESS_TO_CHECKOUT_MUTATION, {
        variables: {
            input: {
                billingAddress: {
                    address1: formik.values.address1,
                    address2: formik.values.address2,
                    city: formik.values.city,
                    countryId: dataCountry ? dataCountry.countryByIso.id : "",
                    firstname: formik.values.firstname,
                    phone: formik.values.phone,
                    stateId: formik.values.stateId,
                    zipcode: formik.values.zipcode
                },
                shippingAddress: {
                    address1: formik.values.address1,
                    address2: formik.values.address2,
                    city: formik.values.city,
                    countryId: dataCountry ? dataCountry.countryByIso.id : "",
                    firstname: formik.values.firstname,
                    phone: formik.values.phone,
                    stateId: formik.values.stateId,
                    zipcode: formik.values.zipcode
                }
            }
        },
        onCompleted: (newDataAddress) => {
            console.log("NEW", newDataAddress.addAddressesToCheckout)
            if (newDataAddress.addAddressesToCheckout.errors.length > 0) {
                addToast(newDataAddress.addAddressesToCheckout.errors[0].message, {
                    appearance: 'error'
                });
            } else {
                dispatch({
                    type: "UPDATE_ORDER",
                    payload: {...state.order, ...newDataAddress.addAddressesToCheckout.order}
                });
                if (newDataAddress.addAddressesToCheckout.order.state === "address") {
                    // toNext();
                }
            }
        },
        onError: (e) => {
            addToast(e.message ? e.message : e, {
                appearance: 'error'
            });
        }
    });

    const [addEmailToOrder, {data: dataEmailToOrder, loading: loadingEmailToOrder}] = useMutation(ADD_EMAIL_TO_ORDER, {
        variables: {
            email: formik.values.email
        },
        onCompleted: (newDataEmailToOrder) => {
            console.log("COMPLETE");
            if (newDataEmailToOrder.setOrderEmail.errors.length > 0) {
                formik.errors.email = newDataEmailToOrder.setOrderEmail.errors[0].message
                addToast(newDataEmailToOrder.setOrderEmail.errors[0].message, {
                    appearance: 'error',
                });
            } else {
                formik.errors.email = null;
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...newDataEmailToOrder.setOrderEmail.order}});
            }
        }
    });

    const handleSendAllForm = () => {
        let newBilling = state.order.billingAddress
        let newValues = formik.values;
        if (newBilling) {
            newBilling = JSON.stringify(newBilling)
            newBilling = JSON.parse(newBilling);
            delete (newBilling["country"]);
            delete (newBilling["__typename"]);
            delete (newBilling["stateName"]);
            delete (newBilling["state"]);
            delete (newValues.email);

        }
        if (isEqual(newValues, newBilling)) {
            console.log("El formulario es el mismo");
        } else {
            console.log("Traer nuevos métodos de envío");
        }
    };

    const handleSendEmail = () => {
        if (formik.values.email !== state.order.email) {
            addEmailToOrder().then(() => {
                handleChangeAddress()
                console.log("ACTUALIZAR 1")
            }).catch((e) => {
                console.log("ERROR", e)
            });
        } else {
            handleChangeAddress();
            // addAddressToOrder();
            console.log("ACTUALIZAR 2")
        }
    };

    const handleChangeAddress = () => {
        const billingAddress = state.order.billingAddress;
        const {phone} = formik.values;
        if (billingAddress) {

        } else {
            addAddressToOrder();
        }
    }


    const onHandleChange = (name, value) => {
        if (name === "stateId") {
            console.log("Recalculate", formik.isValid);
            if (formik.isValid) {
                addAddressToOrder();
            }
        }
    };

    return (
        <div
            className="w-10/12 justify-between mx-auto flex mt-10 space-x-6">
            <div className="w-7/12 space-y-8">
                <OnePageDataCheckout
                    currentOrder={dataCountry.currentOrder}
                    shipments={dataCountry.currentOrder.shipments.nodes}/>
            </div>
            <div className="w-5/12 space-y-4">
                <form
                    id={"addressForm"}
                    ref={formRef}
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit(e);
                    }}
                    className="w-full space-y-4">
                    <OnePageUserData
                        form={formik}
                        handleChangeData={() => {
                        }}
                        handleBlurData={() => {
                        }}
                        errors={formik.errors}
                    />
                    <>
                        <OnePageAddressForm
                            form={formik}
                            handleBlurData={() => {
                            }}
                            country={dataCountry.countryByIso}
                            handleChangeData={onHandleChange}
                            errors={formik.errors}
                        />
                    </>
                </form>
                <>
                    <OnePageDelivery
                        shipments={dataCountry.currentOrder.shipments}
                    />
                    <CheckoutOnePagePayment currentOrder={dataCountry.currentOrder}/>
                </>
                <input type="submit" value={"Enviar"} form={"addressForm"}/>
            </div>
        </div>
    )
}