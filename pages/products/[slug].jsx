import LayoutApplication from "../../src/components/Layout/application";
import runQuery from "../../src/graphql/queries/runQuery";
import ComponentsProductShow from "../../src/components/Product/Show";
import {MAIN_QUERY} from "../../src/graphql/queries/main";
import {useEffect} from 'react';
import LazyLoad from "vanilla-lazyload";

function ProductsShow({data, slug, variant}) {
    useEffect(() => {
        window.customLazyLoad = new LazyLoad({});
    }, [])
    return (
        <LayoutApplication
            currentOrder={data.currentOrder}
        >
            <ComponentsProductShow slug={slug} variant={variant}/>
        </LayoutApplication>
    )
}


export default ProductsShow;


export async function getServerSideProps({query, res}) {
    const data = await runQuery(MAIN_QUERY());
    return {
        props: {
            data: data,
            slug: query.slug,
            variant: query.variant || null
        }
    }
}