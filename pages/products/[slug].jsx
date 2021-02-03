import LayoutApplication from "../../src/components/Layout/application";
import ComponentsProductShow from "../../src/components/Product/Show";
import withApollo from '../../src/lib/apollo'

function ProductsShow() {
    return (
        <LayoutApplication transparentHeader={false}>
            <ComponentsProductShow/>
        </LayoutApplication>
    )
}

export default withApollo({ssr: true})(ProductsShow);
