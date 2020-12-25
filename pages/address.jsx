import LayoutApplication from "../src/components/Layout/application";
import ComponentsCheckoutAddress from "../src/components/Checkout/Address";
import runQuery from "../src/graphql/queries/runQuery";
import {MAIN_QUERY} from "../src/graphql/queries/main";
import PagesError from "../src/pages/error";
import ComponentCheckoutDelivery from "../src/components/Checkout/Delivery";
import PAGE_DELIVERY_QUERY from "../src/graphql/queries/pages/delivery";
import withApollo from "../src/lib/apollo";

function PagesAddress() {
    return (
        <LayoutApplication>
            <ComponentsCheckoutAddress/>
        </LayoutApplication>
    )
}


export default withApollo({ssr: true})(PagesAddress)
