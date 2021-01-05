import {gql} from '@apollo/client';

const UPDATE_STATE_ORDER_MUTATION = gql`
mutation updateStateOrderMutation($stateId: ID!) {
  updateStateOrder(stateId: $stateId) {
    shipments {
      nodes {
        id
        stockLocation {
          name
        }
        shippingRates {
          nodes {
            cost
            currency
            id
            selected
            shippingMethod {
              name
            }
          }
        }
      }
    }
  }
}
`
export default UPDATE_STATE_ORDER_MUTATION;
