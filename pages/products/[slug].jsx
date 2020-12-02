import LayoutApplication from "../../src/components/Layout/application";
import {gql, useMutation} from "@apollo/client";
import {initializeApollo} from "../../src/lib/apolloClient";
import {SHOW_PRODUCT_QUERY} from "../../src/graphql/queries/pages/products/show";
import runQuery from "../../src/graphql/queries/runQuery";
import decryptId from "../../src/lib/decryptId";
import ComponentsProductShow from "../../src/components/Product/Show";


function ProductsShow({data}) {

    if (!data) {
        return (
            <LayoutApplication
                currentCart={{quantity: 2}}
                seo={{title: "Producto"}}>
                <h1>Ha ocurrido un error</h1>
            </LayoutApplication>
        )
    }
    const {productBySlug, currentOrder} = data;
    return (
        <LayoutApplication
            currentOrder={currentOrder}
            seo={{title: `${productBySlug.name}`}}>
            <ComponentsProductShow product={productBySlug}/>
        </LayoutApplication>
    )
}

export default ProductsShow;

export async function getServerSideProps() {
    const data = await runQuery(SHOW_PRODUCT_QUERY)
    return {
        props: {
            data: data
        }
    }
}