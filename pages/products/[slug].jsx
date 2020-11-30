import LayoutApplication from "../../src/components/Layout/application";
import {gql} from "@apollo/client";
import {addApolloState, initializeApollo} from "../../src/lib/apolloClient";

const ALL_PLAYERS_QUERY = gql`
    query{
  productBySlug(slug:"ruby-hoodie"){
    name
    createdAt
    description
    masterVariant{
      images{
        pageInfo{
          hasPreviousPage
        }
        nodes{
          filename
          miniUrl
          alt
        }
      }
    }
    variants{
      nodes{
        images{
          pageInfo{
            hasPreviousPage
          }
          nodes{
            filename
          }
        }
      }
    }
  }
}
  `;

// const client = SpreeClient;
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
            query: ALL_PLAYERS_QUERY,
        })
    } catch (e) {

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