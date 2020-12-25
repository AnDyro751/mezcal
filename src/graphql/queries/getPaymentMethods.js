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
    shippingAddress {
      address2
      address1
      phone
      city
      country {
        id
      }
      lastname
      firstname
      zipcode
      stateName
    }
    billingAddress {
      address2
      address1
      phone
      city
      country {
        id
      }
      lastname
      firstname
      zipcode
      stateName
    }
  }
}

`

export default GET_PAYMENT_METHODS_QUERY