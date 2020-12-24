import LayoutApplication from "../../src/components/Layout/application";
import runQuery from "../../src/graphql/queries/runQuery";
import ComponentsProductShow from "../../src/components/Product/Show";
import {MAIN_QUERY} from "../../src/graphql/queries/main";
import {useEffect} from 'react';
import LazyLoad from "vanilla-lazyload";
import {gql, useQuery} from "@apollo/client";
import withApollo from '../../src/lib/apollo'
import PagesError from "../../src/pages/error";
function ProductsShow(ctx) {
    const {data, error, loading} = useQuery(gql`${MAIN_QUERY()}`);

    useEffect(() => {
        window.customLazyLoad = new LazyLoad({});
    }, [])

    if (loading) {
        return <h2>Cargando...</h2>
    }
    if (!data) {
        return <PagesError message={"Ha ocurrido un error con la data"}/>
    }
    return (
        <LayoutApplication
            currentOrder={data.currentOrder}
        >
            <ComponentsProductShow/>
        </LayoutApplication>
    )
}

export default withApollo({ssr: true})(ProductsShow);


// export default ProductsShow;


// export async function getServerSideProps({query, res}) {
//     const data = await runQuery(MAIN_QUERY());
//     return {
//         props: {
//             data: data,
//             slug: query.slug,
//             variant: query.variant || null
//         }
//     }
// }