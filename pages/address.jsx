import LayoutApplication from "../src/components/Layout/application";
import withApollo from "../src/lib/apollo";
import CheckoutAddress from "../src/components/Checkout/Address";
import CheckoutLayout from "../src/components/Layout/checkout";
import {useQuery} from "@apollo/client";
import CHECKOUT_PAGE_QUERY from "../src/graphql/queries/pages/checkout";
import {useContext} from "react";
import {OrderContext} from "../src/stores/userOrder";

function AddressPage({}) {
    const {state, dispatch} = useContext(OrderContext);

    const {data, loading, error} = useQuery(CHECKOUT_PAGE_QUERY, {
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
                        stateId: newDataCountry.currentOrder.billingAddress ? newDataCountry.currentOrder.billingAddress.state ? newDataCountry.currentOrder.billingAddress.state.id : "" : ""
                    }
                }
            });
        }
    });
    return (
        <LayoutApplication>
            <CheckoutLayout>
                {
                    !loading &&
                    <CheckoutAddress data={data}/>
                }
            </CheckoutLayout>
        </LayoutApplication>
    )
}

export default withApollo({ssr: true})(AddressPage);
