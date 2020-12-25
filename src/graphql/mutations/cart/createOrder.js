import {gql} from '@apollo/client';

const CREATE_ORDER_MUTATION = gql`
mutation {
  createOrder(input: {clientMutationId: "de"}) {
    order {
      state
      itemCount
      completedAt
      guestToken
      itemTotal
      number
      total
      email
      promoTotal
      paymentTotal
      shipmentTotal
    }
  }
}
`;
export default CREATE_ORDER_MUTATION;