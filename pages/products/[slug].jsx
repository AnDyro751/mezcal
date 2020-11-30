import LayoutApplication from "../../src/components/Layout/application";
import {gql} from "@apollo/client";
import {addApolloState, initializeApollo} from "../../src/lib/apolloClient";
import {SHOW_PRODUCT_QUERY} from "../../src/graphql/queries/pages/products/show";

function ProductsShow({data}) {
    console.log(data);
    if (!data) {
        return (
            <LayoutApplication seo={{title: "Producto"}}>
                <h1>Ha ocurrido un error</h1>
            </LayoutApplication>
        )
    }
    return (
        <LayoutApplication seo={{title: "Producto"}}>
            <div>
                <h1>SSR funcionando</h1>
                <button>Agregar al carrito</button>
            </div>
        </LayoutApplication>
    )
}

export default ProductsShow;

export async function getServerSideProps() {
    const apolloClient = initializeApollo()
    let data = null;
    try {
        data = await apolloClient.query({
            query: gql`${SHOW_PRODUCT_QUERY}`,
        })
    } catch (e) {
        console.log(e)
    }

    addApolloState(apolloClient, {
        revalidate: 1,
    })
    return {
        props: {
            data: data
        }
    }
}