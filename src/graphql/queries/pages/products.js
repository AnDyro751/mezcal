import gql from 'graphql-tag'
const SHOW_PRODUCTS_QUERY = gql`
query getProductsQuery($first: Int!, $after: String, $before: String, $last: Int) {
  products(first: $first, after: $after, before: $before, last: $last) {
    edges {
      cursor
      node {
        description
        metaKeywords
        metaTitle
        metaDescription
        name
        slug
        masterVariant {
          id
          defaultPrice {
            amount
            displayAmount
            currency {
              isoCode
            }
          }
          images {
            nodes {
              id
              filename
              smallUrl
            }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      startCursor
      hasPreviousPage
      endCursor
    }
  }
}


`
export default SHOW_PRODUCTS_QUERY