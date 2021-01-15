import ButtonsPrimary from "../../Buttons/primary";
import {useMutation} from "@apollo/client";
import CREATE_CHECKOUT_MUTATION from "../../../graphql/mutations/cart/createCheckout";
import {loadStripe} from '@stripe/stripe-js';
import {useEffect, useState} from "react";
import ADD_PAYMENT_TO_ORDER from "../../../graphql/mutations/cart/addPaymentToOrder";
import {useToasts} from "react-toast-notifications";

const stripePromise = loadStripe('pk_test_51H9CZeBOcPJ0nbHcn3sfLIpeMPDr4YfdEWe7ytAM7bge9lzgYQTC1uOAFopBIbeKc7i3btFTEGaHSrnBfTwmmu4o00Dz7IGOu6');


export default function ButtonStripeCheckout({paymentId}) {

    const [stripeSessionId, setStripeSessionId] = useState("");
    const {addToast} = useToasts();

    useEffect(() => {
        if (stripeSessionId.length > 0) {
            addToast("Agregando nuevo método de pago", {
                appearance: 'success',
            });
            addNewPayment()
        }
    }, [stripeSessionId])

    const [addNewPayment, {data: dataPayment, loading: loadingPayment, error: errorPayment}] = useMutation(ADD_PAYMENT_TO_ORDER, {
        onCompleted: (newData) => {
            if (newData.addPaymentToCheckout.errors.length > 0) {
                addToast(newData.addPaymentToCheckout.errors[0].message, {
                    appearance: 'error',
                });
            } else {
                addToast("Redireigiendo a checkout", {
                    appearance: 'success',
                });
                redirectToCheckout(stripeSessionId);
            }
        },
        onError: (e) => {
            addToast(e.message ? e.message : e, {
                appearance: 'error',
            });
        },
        variables: {
            "input": {
                "paymentMethodId": paymentId,
                "source": {}
            }
        }
    });

    const [createCheckout, {data, loading, error}] = useMutation(CREATE_CHECKOUT_MUTATION, {
        onCompleted: (newData) => {
            console.log("newData", newData);
            if (newData && newData.createCheckout) {
                if (newData.createCheckout.checkoutId) {
                    setStripeSessionId(newData.createCheckout.checkoutId);
                    // addPaymentMethod()
                }
            }
        },
        onError: (e) => {
            console.log(e)
        }
    });


    const redirectToCheckout = async (session_id) => {
        const stripe = await stripePromise;
        if (session_id === null) {
            alert("Ha ocurrido un error")
        } else {
            const result = await stripe.redirectToCheckout({
                sessionId: session_id,
            });
            if (result.error) {
                alert("Ha ocurrido un error");
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer
                // using `result.error.message`.
            }
        }
    }


    const handleClick = async () => {
        createCheckout();
    }

    return (
        <div className="w-full mt-5">
            <ButtonsPrimary
                onClick={handleClick}
                text={"Pagar con stripe"}
            />
        </div>
    )
}