import LayoutApplication from "../src/components/Layout/application";
import ComponentsCheckoutOnePage from "../src/components/Checkout/OnePage";
import withApollo from "../src/lib/apollo";

function CheckoutPage({}) {
    return (
        <LayoutApplication
        >
            <ComponentsCheckoutOnePage/>
        </LayoutApplication>
    )
}

export default withApollo({ssr: true})(CheckoutPage)

