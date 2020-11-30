import LayoutApplication from "../../src/components/Layout/application";
import {gql, useMutation} from "@apollo/client";
import {addApolloState, initializeApollo} from "../../src/lib/apolloClient";
import {SHOW_PRODUCT_QUERY} from "../../src/graphql/queries/pages/products/show";

const MUTATION = gql`mutation{
  addToCart(input:{
    variantId:"U3ByZWU6OlZhcmlhbnQtNg==",
    quantity:1
  }){
    order{
      itemTotal
    }
  }
}`
const apolloClient = initializeApollo()

function ProductsShow({data}) {
    console.log(data);
    const [addToCart, {data: newData, loading, error}] = useMutation(MUTATION, {
        client: apolloClient
    })
    if (!data) {
        return (
            <LayoutApplication seo={{title: "Producto"}}>
                <h1>Ha ocurrido un error</h1>
            </LayoutApplication>
        )
    }
    const {productBySlug} = data;
    return (
        <LayoutApplication
            seo={{title: `${productBySlug.name}`}}>
            <div>
                <h1>{productBySlug.name}</h1>
                <button onClick={addToCart}>Agregar al carrito</button>
            </div>
        </LayoutApplication>
    )
}

export default ProductsShow;

export async function getServerSideProps() {
    let data = null;
    try {
        data = await apolloClient.query({
            query: gql`${SHOW_PRODUCT_QUERY}`,
            fetchPolicy: "cache-first"
        })
        data = data.data
    } catch (e) {
        console.log(e)
    }

    // addApolloState(apolloClient, {
    //     revalidate: 1,
    // })
    return {
        props: {
            data: data
        }
    }
}