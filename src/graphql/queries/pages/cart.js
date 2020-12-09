const SHOW_CART_QUERY = `
lineItems{
      nodes{
          product{
              name
              description
              slug
              masterVariant {
                images {
                  nodes {
                    id
                    alt
                    filename
                    largeUrl
                  }
                }
              }
            }
        amount
        displayAmount
        additionalTaxTotal
        currency
        id
        price
        displayPriceAmount
        quantity
        promoTotal
        variant{
            sku
        }
      }
}
`

export default SHOW_CART_QUERY;