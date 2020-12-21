import {gql} from '@apollo/client'

const PAGE_DELIVERY_QUERY = gql`
{
  currentOrder{
    shipments{
      nodes{
        manifest{
          quantity
        }
        shippingRates{
          nodes{
            cost
            currency
            id
            selected
          }
        }
      }
    }
  }
}
`
export default PAGE_DELIVERY_QUERY