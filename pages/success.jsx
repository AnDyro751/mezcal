import LayoutApplication from "../src/components/Layout/application";
import withApollo from "../src/lib/apollo";
import CheckoutLayout from "../src/components/Layout/checkout";
import {useMutation} from "@apollo/client";
import {useEffect} from "react";
import Router from "next/router";
import COMPLETE_ORDER_MUTATION from "../src/graphql/mutations/cart/completeOrder";

function PagesSuccess() {

    const [completeCheckout, {data, loading, error}] = useMutation(COMPLETE_ORDER_MUTATION, {
        onCompleted: (newData) => {
            console.log("NEWDATA", newData)
        },
        onError: (newError) => {
            console.log(newError);
        }
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('session_id');
        if (myParam) {
            completeCheckout({
                variables: {
                    sessionId: myParam
                }
            })
        } else {
            Router.push("/products")
        }
    }, [])

    return (
        <LayoutApplication
        >
            <CheckoutLayout>
                <h2>Hola</h2>
            </CheckoutLayout>
        </LayoutApplication>
    )
}

export default withApollo({ssr: true})(PagesSuccess)
