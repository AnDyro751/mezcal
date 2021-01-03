import ButtonsPrimary from "../../Buttons/primary";
import {useMutation} from "@apollo/client";
import CREATE_CHECKOUT_MUTATION from "../../../graphql/mutations/cart/createCheckout";
// import {loadStripe} from "@stripe/stripe-js";

export default function StripeForm({}) {
    // const stripePromise = loadStripe("pk_test_51H9CZeBOcPJ0nbHcn3sfLIpeMPDr4YfdEWe7ytAM7bge9lzgYQTC1uOAFopBIbeKc7i3btFTEGaHSrnBfTwmmu4o00Dz7IGOu6");
    // const [createCheckout, {data, loading, error}] = useMutation(CREATE_CHECKOUT_MUTATION, {
    //     onCompleted: async (newData) => {
    //         console.log(newData.createCheckout);
    //         if (newData.createCheckout.checkoutId) {
    //             const stripe = await stripePromise;
    //             stripe
    //                 .redirectToCheckout({sessionId: newData.createCheckout.checkoutId})
    //                 .then(function (result) {
    //                     // If `redirectToCheckout` fails due to a browser or network
    //                     // error, display the localized error message to your customer
    //                     // using `result.error.message`.
    //                 });
    //         }
    //     },
    //     onError: (e) => {
    //         console.log("Ha ocurrido un error", e)
    //     }
    // });
    const createPayment = () => {
        createCheckout();
    }
    return (
        <div className="w-full">
            {/*<ButtonsPrimary text={"Siguiente"} onClick={createPayment} loading={loading}/>*/}
        </div>
    )
}