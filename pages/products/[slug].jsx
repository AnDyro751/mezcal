// import {useEffect} from 'react'
// import SpreeClient from "../../src/utils/spreeClient";
import LayoutApplication from "../../src/components/Layout/application";
import {gql, useQuery} from "@apollo/client";
// import {getStandaloneApolloClient} from "../../src/lib/apolloClient";
import withApollo from '../../src/lib/apolloClient'

export const ALL_PLAYERS_QUERY = gql`
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
function ProductsShow({product}) {
    const {loading, error, data} = useQuery(ALL_PLAYERS_QUERY);
    if (error) {
        return (
            <h2>ERROR</h2>
        )
    }
    if (loading) {
        return (
            <h2>CARGANDO........</h2>
        )
    }
    return (
        <LayoutApplication seo={{title: "Producto"}}>
            <div>
                <h1>SSR funcionando</h1>
            </div>
        </LayoutApplication>
    )
}

export default withApollo({ssr: true})(ProductsShow);