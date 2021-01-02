import {gql} from '@apollo/client';

const GET_PAYMENT_METHODS_QUERY = gql`
{
  currentOrder {
    availablePaymentMethods {
      nodes {
        id
        name
        partialName
        description
      }
    }
  }
}
`

export default GET_PAYMENT_METHODS_QUERY