import {gql} from '@apollo/client';

const ADD_ADDRESS_TO_CHECKOUT_MUTATION = gql`
mutation addAddressToCheckout($input: AddAddressesToCheckoutInput!) {
  addAddressesToCheckout(input: $input) {
    order {
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
    state
      billingAddress {
        address1
        address2
        city
        country {
          iso
          id
        }
        zipcode
        phone
        stateName
      }
      shippingAddress {
        address1
        address2
        city
        country {
          iso
          id
        }
        zipcode
        phone
        stateName
      }
    }
    errors {
      path
      message
    }
  }
}
`;
export default ADD_ADDRESS_TO_CHECKOUT_MUTATION;
