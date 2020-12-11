import LayoutApplication from "../../src/components/Layout/application";
import {SHOW_PRODUCT_QUERY} from "../../src/graphql/queries/pages/products/show";
import runQuery from "../../src/graphql/queries/runQuery";
import ComponentsProductShow from "../../src/components/Product/Show";
import PagesError from "../../src/pages/error";
import {initializeApollo} from "../../src/lib/apolloClient";


function ProductsShow({data}) {

    if (!data) {
        return (
            <LayoutApplication
                seo={{title: "Producto"}}>
                <PagesError message={"Ha ocurrido un error"}/>
            </LayoutApplication>
        )
    }
    const {productBySlug, currentOrder} = data;
    if (productBySlug) {
        return (
            <LayoutApplication
                currentOrder={currentOrder}
                seo={{title: `${productBySlug.name}`}}>
                <ComponentsProductShow product={productBySlug}/>
            </LayoutApplication>
        )
    } else {
        console.log(data)
        return (
            <LayoutApplication
                currentOrder={data.currentOrder}
                seo={{title: "Ha ocurrido un error"}}
            >
                <PagesError message={"Ha ocurrido un error"}/>
            </LayoutApplication>
        )
    }
}

export default ProductsShow;

export async function getServerSideProps({query, res}) {
    const data = await runQuery(SHOW_PRODUCT_QUERY(query.slug));
    if (!data.productBySlug) {
        res.statusCode = 404;
    }
    return {
        props: {
            data: data
        }
    }
}