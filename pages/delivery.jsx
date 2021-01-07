import LayoutApplication from "../src/components/Layout/application";
import ComponentCheckoutDelivery from "../src/components/Checkout/Delivery";
import withApollo from "../src/lib/apollo";
import CheckoutLayout from "../src/components/Layout/checkout";

function PagesDelivery({data}) {

    return (
        <LayoutApplication
        >
            <CheckoutLayout>
                <ComponentCheckoutDelivery/>
            </CheckoutLayout>
        </LayoutApplication>
    )
}


export default withApollo({ssr: true})(PagesDelivery)