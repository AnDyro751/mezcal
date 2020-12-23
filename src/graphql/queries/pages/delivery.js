import {gql} from '@apollo/client'

const PAGE_DELIVERY_QUERY = `
shipments{
      nodes{
          stockLocation{
              name
            }
        shippingRates{
          nodes{
            cost
            currency
            id
            selected
            shippingMethod{
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
`
export default PAGE_DELIVERY_QUERY