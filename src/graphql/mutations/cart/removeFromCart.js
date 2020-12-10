import gql from 'graphql-tag';

const REMOVE_FROM_CART_MUTATION = gql`
mutation removeLineItem($lineItemId: ID!) {
  removeFromCart(input: {lineItemId: $lineItemId}) {
    order {
      itemCount
      adjustmentTotal
      canceledAt
      completedAt
      currency
      email
      guestToken
      itemTotal
      number
      paymentTotal
      promoTotal
      total
      itemTotal
      lineItems {
        nodes {
          product {
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
          variant {
            sku
          }
        }
      }
    }
  }
}
`

export default REMOVE_FROM_CART_MUTATION;