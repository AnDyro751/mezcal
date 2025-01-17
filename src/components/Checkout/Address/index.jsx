import OnePageAddressForm from "../OnePage/AddressForm";
import OnePageUserData from "../OnePage/UserData";
import {useFormik} from "formik";
import validate from "../OnePage/validateValues";
import {useContext} from "react";
import {OrderContext} from "../../../stores/userOrder";
import {useMutation} from "@apollo/client";
import {useToasts} from "react-toast-notifications";
import ADD_ADDRESS_TO_CHECKOUT_MUTATION from "../../../graphql/mutations/cart/addAddressToCheckout";
import NEXT_STATE_MUTATION from "../../../graphql/mutations/cart/nextState";
import Router from "next/router";
import ADD_EMAIL_TO_ORDER from "../../../graphql/mutations/cart/addEmailToOrder";

export default function CheckoutAddress({data}) {
    const {state, dispatch} = useContext(OrderContext);
    const {addToast} = useToasts();

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
            handleSendForm();
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
                addToast(newDataEmailToOrder.setOrderEmail.errors[0].message, {
                    appearance: 'error',
                });
            } else {
                formik.errors.email = null;
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...newDataEmailToOrder.setOrderEmail.order}});
            }
        }
    });

    const [toNext, {loading: loadingNext}] = useMutation(NEXT_STATE_MUTATION, {
        onCompleted: (newData) => {
            if (newData.nextCheckoutState.errors.length >= 1) {
                addToast(newData.nextCheckoutState.errors[0].message, {
                    appearance: 'error'
                });
            } else {
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...newData.nextCheckoutState.order}});
                Router.push("/delivery")
            }
        }
    });

    const [addAddressToOrder, {data: dataAddressToOrder, loading: loadingToOrder, error: errorToOrder}] = useMutation(ADD_ADDRESS_TO_CHECKOUT_MUTATION, {
        variables: {
            input: {
                billingAddress: {
                    address1: formik.values.address1,
                    address2: formik.values.address2,
                    city: formik.values.city,
                    countryId: data.countryByIso ? data.countryByIso.id : "",
                    firstname: formik.values.firstname,
                    phone: formik.values.phone,
                    stateId: formik.values.stateId,
                    zipcode: formik.values.zipcode
                },
                shippingAddress: {
                    address1: formik.values.address1,
                    address2: formik.values.address2,
                    city: formik.values.city,
                    countryId: data.countryByIso ? data.countryByIso.id : "",
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
                    console.log("VAMOS A NEXT");
                    toNext();
                }
            }
        },
        onError: (e) => {
            addToast(e.message ? e.message : e, {
                appearance: 'error'
            });
        }
    });

    const handleSendForm = () => {
        if (state.order.email === formik.values.email) {
            console.log("UPDATE 1");
            addAddressToOrder();
        } else {
            console.log("UPDATE 2");
            addEmailToOrder().then(() => {
                console.log("Email actualizado")
                addAddressToOrder();
            });
        }
    }


    const onHandleChange = (name, value) => {
    };


    return (
        <div className="w-full">
            <form
                id={"addressForm"}
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
                        country={data.countryByIso}
                        handleChangeData={onHandleChange}
                        errors={formik.errors}
                    />
                </>
                <input type="submit" value={"Siguiente"}/>
            </form>
        </div>
    )
}