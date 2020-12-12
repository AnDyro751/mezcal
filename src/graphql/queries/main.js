import gql from "graphql-tag";

export const MAIN_QUERY = function (otherQuery = null, addToOrder = null) {
    return `
{
  currentOrder {
    ${addToOrder ? addToOrder : ""}
    itemCount
    completedAt
    guestToken
    itemTotal
    number
    total
  }
  ${otherQuery ? otherQuery : ""}
}
`
}