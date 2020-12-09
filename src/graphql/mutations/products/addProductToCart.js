import {gql} from "@apollo/client";

export const ADD_PRODUCT_TO_CART_MUTATION = gql`
mutation addProductToCart($variantId: ID!, $quantity: Int!) {
  addToCart(input: {variantId: $variantId, quantity: $quantity}) {
    order{
        itemCount
    adjustmentTotal
    billingAddress {
      address1
      address1
      alternativePhone
      city
      country {
        iso
        isoName
      }
      firstname
      lastname
      phone
      state {
        name
      }
      stateName
      zipcode
    }
    includedTaxTotal
    canceledAt
    completedAt
    confirmationDelivered
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
  }
}
`;
