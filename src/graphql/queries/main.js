import gql from "graphql-tag";

export const MAIN_QUERY = function (otherQuery = null) {
    return `
{
  currentOrder {
    billingAddress {
      address1
      address1
      alternativePhone
      city
      country {
        iso
        isoName
      }
      firstname
      lastname
      phone
      state {
        name
      }
      stateName
      zipcode
    }
    canceledAt
    completedAt
    confirmationDelivered
    currency
    email
    guestToken
    itemTotal
    number
    paymentTotal
    promoTotal
    total
  }
  ${otherQuery}
}
`
}