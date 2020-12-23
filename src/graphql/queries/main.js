export const MAIN_QUERY = function (otherQuery = null, addToOrder = null) {
    return `
{
  currentOrder {
    state
    ${addToOrder ? addToOrder : ""}
    itemCount
    completedAt
    guestToken
    itemTotal
    number
    total
    email
    promoTotal
    paymentTotal
    shipmentTotal
  }
  ${otherQuery ? otherQuery : ""}
}
`
}

