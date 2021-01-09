import {gql} from '@apollo/client';

const APPLY_COUPON_CODE_MUTATION = gql`
mutation ApplyCouponCode($coupon_code:String!){
  applyCouponCode(input:{couponCode:$coupon_code}){
    order{
      total
      itemTotal
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
    }
    errors{
      path
      message
    }
  }
}
`


const REMOVE_COUPON_CODE_MUTATION = gql`
mutation ApplyCouponCode($coupon_code:String!){
  removeCouponCode(input:{couponCode:$coupon_code}){
    order{
      total
      itemTotal
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
    }
    errors{
      path
      message
    }
  }
}
`
export {REMOVE_COUPON_CODE_MUTATION}
export default APPLY_COUPON_CODE_MUTATION;