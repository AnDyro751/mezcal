export const MAIN_QUERY = function (otherQuery = null, addToOrder = null) {
    return `
{
  currentOrder {
    state
    currency
    ${addToOrder ? addToOrder : ""}
    itemCount
    completedAt
    guestToken
    itemTotal
    number
    total
    email
    billingAddress{
      phone
      firstname
      lastname
      zipcode
      address1
      address2
      company
      city
      state{
        name
        id
      }
      country{
        id
        name
      }
    }
  }
  ${otherQuery ? otherQuery : ""}
}
`
}

