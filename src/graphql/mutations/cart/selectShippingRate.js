import {gql} from '@apollo/client';

const SELECT_SHIPPING_RATE = gql`
mutation selectShippingRate($input: SelectShippingRateInput!) {
  selectShippingRate(input: $input) {
    errors {
      path
      message
    }
    order {
      state
      total
      shipmentTotal
    }
  }
}
`;
export default SELECT_SHIPPING_RATE;