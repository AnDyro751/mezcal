import {gql} from '@apollo/client';

const GET_PAYMENT_METHODS_QUERY = gql`
{
  currentOrder {
    availablePaymentMethods {
      nodes {
        name
        id
        description
        partialName
      }
    }
  }
}
`

export default GET_PAYMENT_METHODS_QUERY