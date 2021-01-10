import LayoutApplication from "../../../src/components/Layout/application";
import withApollo from "../../../src/lib/apollo";
import ComponentsPageTaxon from "../../../src/components/Pages/Taxon";

function PagesTaxon() {
    return (
        <LayoutApplication>
            <ComponentsPageTaxon/>
        </LayoutApplication>
    )
}

export default withApollo({ssr: true})(PagesTaxon);