import OnePageAddressForm from "../OnePage/AddressForm";
import OnePageUserData from "../OnePage/UserData";
import {useFormik} from "formik";
import validate from "../OnePage/validateValues";
import {useContext} from "react";
import {OrderContext} from "../../../stores/userOrder";

export default function CheckoutAddress({data}) {
    const {state, dispatch} = useContext(OrderContext);

    const formik = useFormik({
        initialValues: {
            email: state.order ? state.order.email : "",
            phone: state.order ? state.order.billingAddress ? state.order.billingAddress.phone : "" : "",
            firstname: state.order ? state.order.billingAddress ? state.order.billingAddress.firstname : "" : "",
            lastname: state.order ? state.order.billingAddress ? state.order.billingAddress.lastname : "" : "",
            address1: state.order ? state.order.billingAddress ? state.order.billingAddress.address1 : "" : "",
            address2: state.order ? state.order.billingAddress ? state.order.billingAddress.address2 : "" : "",
            zipcode: state.order ? state.order.billingAddress ? state.order.billingAddress.zipcode : "" : "",
            city: state.order ? state.order.billingAddress ? state.order.billingAddress.city : "" : "",
            stateId: state.order ? state.order.billingAddress ? state.order.billingAddress.state ? state.order.billingAddress.state.id : "" : "" : ""
        },
        validate,
        onSubmit: values => {
            // handleSendAllForm();
            // console.log("HOLA")
            alert(JSON.stringify(values, null, 2));
        },
    });

    const onHandleChange = (name, value) => {
        if (name === "stateId") {
            console.log("Recalculate", formik.isValid);
            if (formik.isValid) {
                addAddressToOrder();
            }
        }
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
            </form>
        </div>
    )
}