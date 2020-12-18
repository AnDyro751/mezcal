const SHOW_CART_QUERY = `
adjustmentTotal
        adjustments{
          nodes{
            updatedAt
            label
            eligible
            amount
            promotionCode{
              value
            }
          }
        }
lineItems{
      nodes{
          product{
              name
              description
              slug
              masterVariant {
                isMaster
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
            isMaster
        }
      }
}
`

export default SHOW_CART_QUERY;