import {gql} from "@apollo/client";

const NEXT_STATE_MUTATION = gql`
mutation{
  nextCheckoutState(input:{clientMutationId:""}){
    order{
      total
      state
      shipmentTotal
    }
    errors{
      path
      message
    }
  }
}
`;
export default NEXT_STATE_MUTATION;