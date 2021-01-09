import {useMutation, useQuery} from "@apollo/client";
import ADD_PAYMENT_TO_CHECKOUT_MUTATION from "../../../graphql/mutations/cart/addPaymentTocheckout";
import GET_PAYMENT_METHODS_QUERY from "../../../graphql/queries/getPaymentMethods";
import ComponentsCheckoutPaymentMethod from "../PaymentMethod";
import {useContext, useState} from "react";
import {useToasts} from "react-toast-notifications";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import StripeForm from "../StripeForm";
import Router from 'next/router';
import NEXT_STATE_MUTATION from "../../../graphql/mutations/cart/nextState";
import {OrderContext} from "../../../stores/userOrder";


function ComponentsCheckoutPayment({}) {
    const {addToast} = useToasts();
    const {state, dispatch} = useContext(OrderContext);

    const stripePromise = loadStripe("pk_test_51H9CZeBOcPJ0nbHcn3sfLIpeMPDr4YfdEWe7ytAM7bge9lzgYQTC1uOAFopBIbeKc7i3btFTEGaHSrnBfTwmmu4o00Dz7IGOu6");
    const {data: dataPayment, loading: loadingPayment, error: errorPayment} = useQuery(GET_PAYMENT_METHODS_QUERY)

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    // const [stripePm, setStripePm] = useState(null);
    // INSERT INTO "spree_credit_cards" ("month", "year", "cc_type", "last_digits", "gateway_payment_profile_id", "created_at", "updated_at", "name", "user_id", "payment_method_id", "address_id") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)  [["month", "4"], ["year", "2024"], ["cc_type", "visa"], ["last_digits", "4242"], ["gateway_payment_profile_id", "pm_1I73rNBOcPJ0nbHcwOB6B74y"], ["created_at", "2021-01-07 19:09:31.220364"], ["updated_at", "2021-01-07 19:09:31.220364"], ["name", "Angel Mendez"], ["user_id", 1], ["payment_method_id", 5], ["address_id", 82]]
    const [toNext, {data: dataNext, loading: loadingNext}] = useMutation(NEXT_STATE_MUTATION, {
        onCompleted: (newData) => {
            if (newData.nextCheckoutState.errors.length > 0) {
                addToast(newData.nextCheckoutState.errors[0].message, {
                    appearance: "error"
                })
            } else {
                dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...newData.nextCheckoutState.order}});
                if (newData.nextCheckoutState.order.state === "confirm") {
                    Router.push("/confirm")
                }

            }
        }
    })

    const [addPaymentMethod, {data, loading, error}] = useMutation(ADD_PAYMENT_TO_CHECKOUT_MUTATION, {
        onCompleted: (newData) => {
            if (newData.addPaymentToCheckout.errors.length > 0) {
                addToast(newData.addPaymentToCheckout.errors[0].message, {
                    appearance: "error"
                })
            } else {
                toNext();
            }
        }
    });


    const onHandleResult = (stripeResult) => {
        console.log(stripeResult, "Stripe Payment Method");
        if (stripeResult) {
            let stripePm = stripeResult.paymentMethod;
            let variables = {
                "name": "Angel Mendez",
                month: stripePm.card.exp_month.toString(),
                year: stripePm.card.exp_year.toString(),
                "cc_type": stripePm.card.brand,
                last_digits: stripePm.card.last4.toString(),
                gateway_payment_profile_id: stripePm.id,
            };
            console.log(variables);
            addPaymentMethod({
                variables: {
                    "source": variables,
                    "paymentMethodId": selectedPaymentMethod ? selectedPaymentMethod.id : ""
                }
            })
        }
    };

    if (loadingPayment) {
        return (
            <h2>Cargando data</h2>
        )
    }

    return (
        <Elements stripe={stripePromise}>
            <div className="w-10/12 mx-auto mt-10">
                <h2 className="text-4xl font-medium mb-10">Pagar</h2>
                {
                    !loadingPayment && !errorPayment &&
                    dataPayment.currentOrder.availablePaymentMethods.nodes.map((paymentMethod, i) => (
                        <ComponentsCheckoutPaymentMethod
                            handleChange={(paymentM) => {
                                setSelectedPaymentMethod(paymentM);
                            }}
                            checked={selectedPaymentMethod ? selectedPaymentMethod.id === paymentMethod.id : false}
                            paymentMethod={paymentMethod} key={i}
                        />
                    ))
                }
                {
                    selectedPaymentMethod &&
                    (selectedPaymentMethod.partialName === "stripe" || selectedPaymentMethod.partialName === "gateway") &&
                    <StripeForm
                        handleResult={onHandleResult}
                    />
                }
                <div className="w-full mt-5">
                    {/*<ButtonsPrimary*/}
                    {/*    disabled={!selectedPaymentMethod}*/}
                    {/*    onClick={handleClick} text={"Agregar método de pago"}/>*/}
                </div>
            </div>
        </Elements>
    )
}


export default ComponentsCheckoutPayment;