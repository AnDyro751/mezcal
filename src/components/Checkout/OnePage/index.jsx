import OnePageListProducts from "./ListProducts";
import OnePageAddressForm from "./AddressForm";
import OnePageListProductsLoader from "./Loaders/ListProductsLoader";
import OnePageDataCheckout from "./Data";
import OnePageUserData from "./UserData";
import {useContext, useMemo, useRef, useState} from "react";
import {useToasts} from "react-toast-notifications";
import {useMutation, useQuery} from "@apollo/client";
import ADD_EMAIL_TO_ORDER from "../../../graphql/mutations/cart/addEmailToOrder";
import {OrderContext} from "../../../stores/userOrder";
import OnePageDelivery from "./Delivery";
import {useFormik} from "formik";
import CHECKOUT_PAGE_QUERY from "../../../graphql/queries/pages/checkout";
import validate from "./validateValues";
import ADD_ADDRESS_TO_CHECKOUT_MUTATION from "../../../graphql/mutations/cart/addAddressToCheckout";
import CheckoutOnePagePayment from "./Payment";

export default function ComponentsCheckoutOnePage({}) {
    const {addToast} = useToasts();
    const formRef = useRef();
    const {state, dispatch} = useContext(OrderContext);
    const {data: dataCountry, loading: loadingCountry, error: errorCountry} = useQuery(CHECKOUT_PAGE_QUERY, {
        variables: {
            isoCode: "MX"
        }
    });

    const formik = useFormik({
        initialValues: {
            email: state.order ? state.order.email : "",
            phone: state.order ? state.order.billingAddress ? state.order.billingAddress.phone : "" : "",
            firstname: state.order ? state.order.billingAddress ? state.order.billingAddress.firstname : "" : "",
            lastname: state.order ? state.order.billingAddress ? state.order.billingAddress.lastname : "" : "",
            address1: state.order ? state.order.billingAddress ? state.order.billingAddress.address1 : "" : "",
            address2: state.order ? state.order.billingAddress ? state.order.billingAddress.address2 : "" : "",
            cp: state.order ? state.order.billingAddress ? state.order.billingAddress.zipcode : "" : "",
            city: state.order ? state.order.billingAddress ? state.order.billingAddress.city : "" : "",
            stateId: state.order ? state.order.billingAddress ? state.order.billingAddress.state ? state.order.billingAddress.state.id : "" : "" : ""
        },
        validate,
        onSubmit: values => {
            if (formik.values.email !== state.order.email) {
                addEmailToOrder().then(() => {
                    addAddressToOrder()
                    console.log("ACTUALIZAR 1")
                }).catch((e) => {
                    console.log("ERROR", e)
                });
            } else {
                addAddressToOrder()
                console.log("ACTUALIZAR 2")
            }
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
                    lastname: formik.values.lastname,
                    phone: formik.values.phone,
                    stateId: formik.values.stateId,
                    zipcode: formik.values.cp
                },
                shippingAddress: {
                    address1: formik.values.address1,
                    address2: formik.values.address2,
                    city: formik.values.city,
                    countryId: dataCountry ? dataCountry.countryByIso.id : "",
                    firstname: formik.values.firstname,
                    lastname: formik.values.lastname,
                    phone: formik.values.phone,
                    stateId: formik.values.stateId,
                    zipcode: formik.values.cp
                }
            }
        },
        onCompleted: (newDataAddress) => {
            if (newDataAddress.addAddressesToCheckout.errors.length > 0) {
                addToast(newDataAddress.addAddressesToCheckout.errors[0].message, {
                    appearance: 'error'
                });
            } else {
                dispatch({
                    type: "UPDATE_ORDER",
                    payload: {...state.order, ...newDataAddress.addAddressesToCheckout.order}
                });
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

    return (
        <div
            className="w-10/12 justify-between mx-auto flex mt-10 space-x-6">
            <div className="w-8/12 space-y-8">
                <form
                    id={"addressForm"}
                    ref={formRef}
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit(e);
                    }}
                    className="w-full space-y-8">
                    <OnePageUserData
                        form={formik}
                        handleChangeData={() => {
                        }}
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
                                handleChangeData={() => {
                                }}
                                errors={formik.errors}
                            />
                        </>
                    }
                </form>
                {!loadingCountry && !errorCountry &&
                <>
                    <OnePageDelivery
                        shipments={dataCountry.currentOrder.shipments}
                    />
                    <CheckoutOnePagePayment/>

                </>
                }
            </div>
            <div className="w-4/12">
                <OnePageDataCheckout shipments={dataCountry ? dataCountry.currentOrder.shipments.nodes : []}/>
            </div>
        </div>
    )
}