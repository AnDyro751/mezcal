import LayoutApplication from "../../src/components/Layout/application";
import {gql, useMutation} from "@apollo/client";
import {initializeApollo} from "../../src/lib/apolloClient";
import {SHOW_PRODUCT_QUERY} from "../../src/graphql/queries/pages/products/show";
import runQuery from "../../src/graphql/queries/runQuery";

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
    const [addToCart, {data: newData, loading, error}] = useMutation(MUTATION, {
        client: apolloClient
    })
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
    console.log(productBySlug)
    return (
        <LayoutApplication
            currentOrder={currentOrder}
            seo={{title: `${productBySlug.name}`}}>
            <div>
                <h1>{productBySlug.name}</h1>
                <h3>{atob(productBySlug.masterVariant.images.nodes[0].id)}</h3>
                <button onClick={addToCart}>Agregar al carrito</button>
            </div>
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