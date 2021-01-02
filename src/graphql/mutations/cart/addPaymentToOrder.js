import {gql} from "@apollo/client";

const ADD_PAYMENT_TO_ORDER = gql`
mutation addPaymentToCurrentOrder($input: AddPaymentToCheckoutInput!) {
  addPaymentToCheckout(input: $input) {
    order {
      state
      total
      itemTotal
      itemCount
    }
    errors {
      message
      path
    }
  }
}
`

export default ADD_PAYMENT_TO_ORDER;