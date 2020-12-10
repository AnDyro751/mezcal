import gql from 'graphql-tag';

const UPDATE_CART_QUANTITY_MUTATION = gql`
mutation updateLineItemQuantity($quantity: Int!, $lineItemId: ID!) {
  updateCartQuantity(input: {quantity: $quantity, lineItemId: $lineItemId}) {
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

export default UPDATE_CART_QUANTITY_MUTATION;