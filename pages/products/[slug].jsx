import LayoutApplication from "../../src/components/Layout/application";
import {SHOW_PRODUCT_QUERY} from "../../src/graphql/queries/pages/products/show";
import runQuery from "../../src/graphql/queries/runQuery";
import ComponentsProductShow from "../../src/components/Product/Show";
import PagesError from "../../src/pages/error";
import {gql, useQuery} from '@apollo/client'
import {useRouter} from 'next/router'
import {MAIN_QUERY} from "../../src/graphql/queries/main";

function ProductsShow({data}) {
    return (
        <LayoutApplication
            currentOrder={data.currentOrder}
        >
            <ComponentsProductShow/>
        </LayoutApplication>
    )
}


export default ProductsShow;


export async function getServerSideProps({query, res}) {
    const data = await runQuery(MAIN_QUERY());
    return {
        props: {
            data: data
        }
    }
}