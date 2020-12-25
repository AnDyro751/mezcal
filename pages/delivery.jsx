import LayoutApplication from "../src/components/Layout/application";
import ComponentCheckoutDelivery from "../src/components/Checkout/Delivery";
import withApollo from "../src/lib/apollo";

function PagesDelivery({data}) {

    return (
        <LayoutApplication
        >
            <ComponentCheckoutDelivery/>
        </LayoutApplication>
    )
}


export default withApollo({ssr: true})(PagesDelivery)