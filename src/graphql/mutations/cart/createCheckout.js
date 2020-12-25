import {gql} from '@apollo/client';

const CREATE_CHECKOUT_MUTATION = gql`
mutation {
  createCheckout {
    checkoutId
  }
}
`;

export default CREATE_CHECKOUT_MUTATION;