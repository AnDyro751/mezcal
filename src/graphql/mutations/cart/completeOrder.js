import {gql} from '@apollo/client';

const COMPLETE_ORDER_MUTATION = gql`
mutation completeOrderMutation($sessionId:String!){
  completeOrder(sessionId: $sessionId) {
    state
  }
}
`;

export default COMPLETE_ORDER_MUTATION;