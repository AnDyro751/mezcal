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
        images {
          nodes {
            smallUrl
            filename
          }
        }
      }
    }
  }
}
`
export default INDEX_PAGE_QUERY;