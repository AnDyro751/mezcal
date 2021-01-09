import LayoutApplication from "../src/components/Layout/application";
import ComponentCheckoutDelivery from "../src/components/Checkout/Delivery";
import withApollo from "../src/lib/apollo";
import CheckoutLayout from "../src/components/Layout/checkout";
import {useQuery} from "@apollo/client";
import PAGE_DELIVERY_QUERY from "../src/graphql/queries/pages/delivery";
import {useContext} from "react";
import {OrderContext} from "../src/stores/userOrder";

function PagesDelivery({}) {
    const {state, dispatch} = useContext(OrderContext);
    const {data, loading, error} = useQuery(PAGE_DELIVERY_QUERY, {
        fetchPolicy: "no-cache",
        onCompleted: (newData) => {
            dispatch({
                type: "UPDATE_ORDER",
                payload: {
                    ...state.order,
                    ...newData.currentOrder,
                    billingAddress: {
                        ...newData.currentOrder.billingAddress,
                        stateId: newData.currentOrder.billingAddress ? newData.currentOrder.billingAddress.state ? newData.currentOrder.billingAddress.state.id : "" : ""
                    }
                }
            });
        }
    });

    return (
        <LayoutApplication
        >
            <CheckoutLayout>
                {error &&
                <h2>Error</h2>
                }
                {loading &&
                <h2>Cargando...</h2>
                }
                {!loading &&
                <ComponentCheckoutDelivery currentOrder={data.currentOrder}/>
                }
            </CheckoutLayout>
        </LayoutApplication>
    )
}


export default withApollo({ssr: true})(PagesDelivery)