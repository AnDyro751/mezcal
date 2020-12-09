const SHOW_CART_QUERY = `
lineItems{
      nodes{
      product{
          name
        }
        amount
        additionalTaxTotal
        currency
        hasSufficientStock
        id
        price
        quantity
        promoTotal
        variant{
          isMaster
          defaultPrice{
            displayAmount
          }
          sku
        }
      }
}
`

export default SHOW_CART_QUERY;