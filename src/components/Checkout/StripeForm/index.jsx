import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import ButtonsPrimary from "../../Buttons/primary";

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};

export default function StripeForm({}) {
    const stripe = useStripe();
    const elements = useElements();

    const handleClick = () => {
        stripe
            .createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Jenny Rosen',
                },
            })
            .then(function (result) {
                console.log(result, "RESULT")
                // Handle result.error or result.paymentMethod
            }).catch((e) => {
            console.log("ERROR", e)
        });
    };

    return (
        <div className="w-full">
            <CardElement options={CARD_ELEMENT_OPTIONS}/>
            <ButtonsPrimary
                onClick={handleClick} text={"Agregar método de pago"}/>
        </div>
    )
}