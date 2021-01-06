import LayoutApplication from "../src/components/Layout/application";
import ComponentsCheckoutOnePage from "../src/components/Checkout/OnePage";
import withApollo from "../src/lib/apollo";
import {useQuery} from "@apollo/client";
import CHECKOUT_PAGE_QUERY from "../src/graphql/queries/pages/checkout";
import {useContext} from "react";
import {OrderContext} from "../src/stores/userOrder";

function CheckoutPage({}) {
    const {state, dispatch} = useContext(OrderContext);

    const {data: dataCountry, loading, error} = useQuery(CHECKOUT_PAGE_QUERY, {
        variables: {
            isoCode: "MX"
        },
        onCompleted: (newDataCountry) => {
            console.log("CountryByIso", newDataCountry.currentOrder);
            dispatch({
                type: "UPDATE_ORDER",
                payload: {
                    ...state.order,
                    ...newDataCountry.currentOrder,
                    billingAddress: {
                        ...newDataCountry.currentOrder.billingAddress,
                        stateId: newDataCountry.currentOrder.billingAddress.state ? newDataCountry.currentOrder.billingAddress.state.id : ""
                    }
                }
            });
        }
    });
    return (
        <LayoutApplication
        >
            {
                loading &&
                <h2>Cargando...</h2>
            }
            {
                !loading &&
                <ComponentsCheckoutOnePage dataCountry={dataCountry}/>
            }
        </LayoutApplication>
    )
}

export default withApollo({ssr: true})(CheckoutPage)

