import {gql} from '@apollo/client'

const PAGE_DELIVERY_QUERY = gql`
{
  currentOrder {
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
      firstname
      zipcode
      stateName
    }
  }
}

`
export default PAGE_DELIVERY_QUERY