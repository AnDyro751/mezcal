import {gql} from '@apollo/client';

const GET_PAYMENT_METHODS_QUERY = gql`
{
  currentOrder {
        adjustmentTotal
        shipmentAdjustments {
          nodes {
            updatedAt
            label
            eligible
            amount
            promotionCode {
              value
            }
          }
        }
        adjustments{
          nodes{
            updatedAt
            label
            eligible
            amount
            promotionCode{
              value
            }
          }
        }
      shipments {
          nodes {
            stockLocation{
                  name
            }
            state
            number
            id
            tracking
            shippingRates {
              nodes {
                cost
                id
                currency
                selected
                shippingMethod {
                  id
                  name
                  carrier
                  trackingUrl
                  adminName
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
      state{
        id
      }
      stateName
    }
    billingAddress {
      address2
      state{
        id
      }
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
    availablePaymentMethods {
      nodes {
        id
        name
        partialName
        description
      }
    }
  }
}
`

export default GET_PAYMENT_METHODS_QUERY