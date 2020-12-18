import {gql} from '@apollo/client';

const APPLY_COUPON_CODE_MUTATION = gql`
mutation ApplyCouponCode($coupon_code:String!){
  applyCouponCode(input:{couponCode:$coupon_code}){
    order{
      total
      itemTotal
      adjustmentTotal
    }
    errors{
      path
      message
    }
  }
}
`

export default APPLY_COUPON_CODE_MUTATION;