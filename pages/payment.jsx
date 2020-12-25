import LayoutApplication from "../src/components/Layout/application";
import ComponentsCheckoutPayment from "../src/components/Checkout/Payment";
import withApollo from "../src/lib/apollo";

function PagesPayment() {
    return (
        <LayoutApplication
        >
            <ComponentsCheckoutPayment/>
        </LayoutApplication>
    )
}

export default withApollo({ssr: true})(PagesPayment)
