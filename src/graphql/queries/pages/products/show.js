import {MAIN_QUERY} from "../../main";

const DEFAULT_QUERY = `productBySlug(slug: "ruby-hoodie") {
    name
    createdAt
    description
    masterVariant {
    id
      images {
        pageInfo {
          hasPreviousPage
        }
        nodes {
          filename
          miniUrl
          alt
        }
      }
    }
    variants {
      nodes {
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