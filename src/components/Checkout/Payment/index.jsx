import {useMutation, useQuery} from "@apollo/client";
import ADD_PAYMENT_TO_CHECKOUT_MUTATION from "../../../graphql/mutations/cart/addPaymentTocheckout";
import GET_PAYMENT_METHODS_QUERY from "../../../graphql/queries/getPaymentMethods";
import ComponentsCheckoutPaymentMethod from "../PaymentMethod";
import {useState} from "react";
import {useToasts} from "react-toast-notifications";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import StripeForm from "../StripeForm";


function ComponentsCheckoutPayment({}) {
    const {addToast} = useToasts();
    const stripePromise = loadStripe("pk_test_51H9CZeBOcPJ0nbHcn3sfLIpeMPDr4YfdEWe7ytAM7bge9lzgYQTC1uOAFopBIbeKc7i3btFTEGaHSrnBfTwmmu4o00Dz7IGOu6");
    const {data: dataPayment, loading: loadingPayment, error: errorPayment} = useQuery(GET_PAYMENT_METHODS_QUERY)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const [addPaymentMethod, {data, loading, error}] = useMutation(ADD_PAYMENT_TO_CHECKOUT_MUTATION, {
        variables: {
            source: {
                "name": "Angel Mendez",
                "number": "4111111111111111",
                "expiry": "02 / 21",
                "verification_value": "121",
                "cc_type": "visa",
                "paymentMethodId": selectedPaymentMethod ? selectedPaymentMethod.id : ""
            }
        }
    });


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
                    <StripeForm/>
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