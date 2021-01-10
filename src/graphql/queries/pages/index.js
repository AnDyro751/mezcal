import {gql} from '@apollo/client';

const INDEX_PAGE_QUERY = gql`
query getIndexProducts($first: Int!) {
  taxonomies(first: 4) {
    nodes {
      name
      rootTaxon {
        children(first: 4) {
          nodes {
            name
            permalink
          }
        }
        name
        permalink
      }
    }
  }
  products(first: $first) {
    nodes {
      name
      avgRating
      description
      id
      reviewsCount
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
        images (first: 1){
            nodes {
              id
              alt
              filename
              largeUrl
            }
          }
      }
    }
  }
}
`
export default INDEX_PAGE_QUERY;