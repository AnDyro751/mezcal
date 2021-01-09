import {gql} from '@apollo/client';

const CHECKOUT_PAGE_QUERY = gql`
query getCountryByISO($isoCode: String!) {

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
  countryByIso(isoCode: $isoCode) {
    statesRequired
    iso
    isoName
    id
    states {
      nodes {
        id
        name
      }
    }
  }
}

`;

export default CHECKOUT_PAGE_QUERY;
