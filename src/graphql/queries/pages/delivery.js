import {gql} from '@apollo/client'

const PAGE_DELIVERY_QUERY = gql`
{
  
  currentOrder {
  availablePaymentMethods {
      nodes {
        id
        name
        partialName
        description
      }
    }
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
  }
}

`
export default PAGE_DELIVERY_QUERY