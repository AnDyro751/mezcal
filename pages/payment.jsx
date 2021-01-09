import LayoutApplication from "../src/components/Layout/application";
import ComponentsCheckoutPayment from "../src/components/Checkout/Payment";
import withApollo from "../src/lib/apollo";
import CheckoutLayout from "../src/components/Layout/checkout";

function PagesPayment() {
    return (
        <LayoutApplication
        >
            <CheckoutLayout>
                <ComponentsCheckoutPayment/>
            </CheckoutLayout>
        </LayoutApplication>
    )
}

export default withApollo({ssr: true})(PagesPayment)
