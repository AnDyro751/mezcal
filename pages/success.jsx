import LayoutApplication from "../src/components/Layout/application";
import withApollo from "../src/lib/apollo";
import CheckoutLayout from "../src/components/Layout/checkout";
import {useMutation} from "@apollo/client";
import {useContext, useEffect} from "react";
import Router from "next/router";
import COMPLETE_ORDER_MUTATION from "../src/graphql/mutations/cart/completeOrder";
import {OrderContext} from "../src/stores/userOrder";
import removeCookie from "../src/lib/removeCookie";

function PagesSuccess() {
    const {state, dispatch} = useContext(OrderContext);

    const [completeCheckout, {data, loading, error}] = useMutation(COMPLETE_ORDER_MUTATION, {
        onCompleted: (newData) => {
            console.log("NEWDATA", newData);
            if (newData.completeOrder) {
                if (newData.completeOrder.state === "complete") {
                    dispatch({type: "DELETE_ORDER"});
                    console.log("REMOVE")
                    removeCookie("authorization_guest_token");
                }
            }else{
                console.log("NO HAY")
            }
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
                {
                    loading &&
                    <h1 className="text-4xl">Cargando...</h1>
                }
                {
                    data && data.completeOrder && data.completeOrder.state === "complete" &&
                    <div className="w-full bg-green-200 px-3 py-7 rounded">
                        <p className="text-3xl text-green-900 font-medium">Orden confirmada</p>
                    </div>
                }
            </CheckoutLayout>
        </LayoutApplication>
    )
}

export default withApollo({ssr: true})(PagesSuccess)
