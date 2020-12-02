import {MAIN_QUERY} from "../../main";

const DEFAULT_QUERY = `productBySlug(slug: "ruby-hoodie") {
    name
    createdAt
    description
    masterVariant {
        defaultPrice {
            id
            displayAmount
            displayAmount
            amount
            displayCountry
            currency {
              name
              isoCode
            }
          }
        id
      images {
        pageInfo {
          hasPreviousPage
        }
        nodes {
          filename
          largeUrl
          id
          alt
        }
      }
    }
    variants {
      nodes {
        defaultPrice {
            id
            displayAmount
            displayAmount
            amount
            displayCountry
            currency {
              name
              isoCode
            }
          }
        images {
          pageInfo {
            hasPreviousPage
          }
          nodes {
            filename
          }
        }
      }
    }
  }`
export const SHOW_PRODUCT_QUERY = MAIN_QUERY(DEFAULT_QUERY);