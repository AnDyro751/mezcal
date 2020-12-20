import runQuery from "../src/graphql/queries/runQuery";
import {MAIN_QUERY} from "../src/graphql/queries/main";
import LayoutApplication from "../src/components/Layout/application";
import ComponentsCheckoutAddress from "../src/components/Checkout/Address";

export default function CheckoutPage({data}) {
    return (
        <LayoutApplication
            currentOrder={data.currentOrder}
        >
            <ComponentsCheckoutAddress/>
        </LayoutApplication>
    )
}

export async function getServerSideProps({query, res}) {
    const data = await runQuery(MAIN_QUERY());
    return {
        props: {
            data: data,
        }
    }
}