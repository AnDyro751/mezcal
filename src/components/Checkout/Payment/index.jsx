import {useMutation, useQuery} from "@apollo/client";
import ADD_PAYMENT_TO_CHECKOUT_MUTATION from "../../../graphql/mutations/cart/addPaymentTocheckout";
import withApollo from "../../../lib/apollo";
import GET_PAYMENT_METHODS_QUERY from "../../../graphql/queries/getPaymentMethods";
import ComponentsCheckoutPaymentMethod from "../PaymentMethod";
import {useState} from "react";
import CardForm from "../CardForm";

function ComponentsCheckoutPayment({}) {
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
                "paymentMethodId": ""
            }
        }
    });

    const handleClick = () => {
        addPaymentMethod();
    }

    return (
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
                selectedPaymentMethod.partialName === "gateway" &&
                <CardForm />
            }
        </div>
    )
}


export default withApollo({ssrc: true})(ComponentsCheckoutPayment)