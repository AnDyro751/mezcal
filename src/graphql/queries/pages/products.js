const SHOW_PRODUCTS_QUERY = `
products(first: 20) {
    nodes {
      description
      metaKeywords
      metaTitle
      metaDescription
      name
      slug
      masterVariant{
        defaultPrice{
          amount
          displayAmount
          currency{
            isoCode
          }
        }
        images{
          nodes{
            id
            filename
            smallUrl
          }
        }
      }
    }
  }
`
export default SHOW_PRODUCTS_QUERY