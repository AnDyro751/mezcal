import {gql} from '@apollo/client';

const COMPLETE_CHECKOUT_MUTATION = gql`
mutation {
  completeCheckout(input: {clientMutationId: "1"}) {
    order {
      state
    }
    errors {
      message
    }
  }
}
`;
export default COMPLETE_CHECKOUT_MUTATION;