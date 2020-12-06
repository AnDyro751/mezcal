import {MAIN_QUERY} from "../../main";

const DEFAULT_QUERY = `productBySlug(slug: "demo-1") {
    name
    createdAt
    description
    optionTypes{
      nodes{
        name
        position
        presentation
        optionValues{
          nodes{
            id
            name
            presentation
          }
        }
      }
    }
    masterVariant {
        sku
        id
        optionValues {
            nodes {
                id
              name
              position
              presentation
            }
          }
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
        nodes {
          filename
          largeUrl
          id
          alt
        }
      }
    }
    depthVariants {
      nodes {
        id
        sku
          displayOptionValues {
            nodes {
                id
              name
              position
              presentation
            }
          }
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
          nodes {
              filename
              largeUrl
              id
              alt
          }
        }
      }
    }
  }`
export const SHOW_PRODUCT_QUERY = MAIN_QUERY(DEFAULT_QUERY);