import LayoutApplication from "../../src/components/Layout/application";
import {SHOW_PRODUCT_QUERY} from "../../src/graphql/queries/pages/products/show";
import runQuery from "../../src/graphql/queries/runQuery";
import ComponentsProductShow from "../../src/components/Product/Show";
import PagesError from "../../src/pages/error";
import {initializeApollo} from "../../src/lib/apolloClient";
import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

function ProductsShow({}) {
    // const {productBySlug, currentOrder} = data;
    const {data, loading, error} = useQuery(gql`${SHOW_PRODUCT_QUERY("demo-1")}`, {
        client: initializeApollo()
    });
    // const {productBySlug, currentOrder} = data;
    console.log(data)
    if (loading) {
        return (
            <h1>LOading</h1>
        )
    }
    return (
        <h1>HOLA</h1>
    )
    // if (productBySlug) {
    //     return (
    //         <LayoutApplication
    //             data={data}
    //             currentOrder={currentOrder}
    //             seo={{title: `${productBySlug.name}`}}>
    //             <ComponentsProductShow product={productBySlug}/>
    //         </LayoutApplication>
    //     )
    // } else {
    //     return (
    //         <LayoutApplication
    //             currentOrder={data.currentOrder}
    //             seo={{title: "Ha ocurrido un error"}}
    //         >
    //             <PagesError message={"Ha ocurrido un error"}/>
    //         </LayoutApplication>
    //     )
    // }
}

export default ProductsShow;

// export async function getServerSideProps({query, res}) {
//     const data = await runQuery(SHOW_PRODUCT_QUERY(query.slug));
//     if (!data.productBySlug) {
//         res.statusCode = 404;
//     }
//     return {
//         props: {
//             data: data
//         }
//     }
// }