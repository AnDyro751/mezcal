import Head from 'next/head'
import LayoutApplication from "../src/components/Layout/application";
import {gql} from "@apollo/client";
import {SHOW_PRODUCT_QUERY} from "../src/graphql/queries/pages/products/show";
import {initializeApollo} from "../src/lib/apolloClient";
import {MAIN_QUERY} from "../src/graphql/queries/main";
import runQuery from "../src/graphql/queries/runQuery";


function Home({data}) {
    if (!data) {
        return (
            <h1>error</h1>
        )
    }
    const {currentOrder} = data;
    console.log(currentOrder)
    return (
        <LayoutApplication currentOrder={currentOrder}>
            <h1 className="text-4xl">Index</h1>
        </LayoutApplication>
    )
}

export default Home


export async function getServerSideProps() {
    const data = await runQuery(MAIN_QUERY())
    return {
        props: {
            data: data
        }
    }
}
