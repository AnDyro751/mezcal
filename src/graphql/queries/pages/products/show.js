import {MAIN_QUERY} from "../../main";

const DEFAULT_QUERY = (slug = "") => {
}
export const SHOW_PRODUCT_QUERY = (slug = "") => {
    return `query getProductBySlug{
        productBySlug(slug: "${slug}") {
        reviewsCount
        slug
        avgRating
    name
    createdAt
    description
    taxons{
      nodes{
        name
        description
        id
        permalink
      }
    }
    
    productProperties{
      nodes{
        value
        property{
          name
        }
      }
    }
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
        isMaster
        sku
        id
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
        isMaster
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
            amount
            displayCountry
            currency{
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
  }
    }`
    // return MAIN_QUERY(DEFAULT_QUERY(slug));
    return DEFAULT_QUERY(slug);
};