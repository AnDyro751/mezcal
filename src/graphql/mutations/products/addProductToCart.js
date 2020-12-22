import {gql} from "@apollo/client";

export const ADD_PRODUCT_TO_CART_MUTATION = gql`
mutation addProductToCart($variantId: ID!, $quantity: Int!) {
  addToCart(input: {variantId: $variantId, quantity: $quantity}) {
    order{
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
    }
    errors{
        path
        message
    }
  }
}
`;
