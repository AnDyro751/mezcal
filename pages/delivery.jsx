import LayoutApplication from "../src/components/Layout/application";
import ComponentCheckoutDelivery from "../src/components/Checkout/Delivery";
import withApollo from "../src/lib/apollo";
import CheckoutLayout from "../src/components/Layout/checkout";
import {useQuery} from "@apollo/client";
import PAGE_DELIVERY_QUERY from "../src/graphql/queries/pages/delivery";

function PagesDelivery({}) {
    const {data, loading, error} = useQuery(PAGE_DELIVERY_QUERY, {
        fetchPolicy: "no-cache"
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