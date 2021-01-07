import {gql} from '@apollo/client';

const ADD_PAYMENT_TO_CHECKOUT_MUTATION = gql`
mutation AddPaymentToCheckout($source: JSON!, $paymentMethodId: ID!) {
  addPaymentToCheckout(input: {source: $source, paymentMethodId: $paymentMethodId}) {
    order {
      approvedAt
      total
    }
    errors {
      path
      message
    }
  }
}
`
export default ADD_PAYMENT_TO_CHECKOUT_MUTATION