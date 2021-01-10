import {gql} from '@apollo/client';

const GET_TAXONOMY_BY_PERMALINK_QUERY = gql`
query getTaxonByPermalink($permalink: String!) {
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
  taxonByPermalink(permalink: $permalink) {
    name
    permalink
    parentTaxon {
      name
      permalink
    }
    products(first: 20) {
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
          images(first: 1) {
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
    children {
      nodes {
        name
      }
    }
  }
}
`
export default GET_TAXONOMY_BY_PERMALINK_QUERY;