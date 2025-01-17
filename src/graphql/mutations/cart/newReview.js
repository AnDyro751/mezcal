import {gql} from '@apollo/client';

const NEW_REVIEW_MUTATION = gql`
mutation addReviewToProductMutation($productId: String!, $title: String!, $review: String!, $name: String!,$rating: Int!) {
  addReviewToProduct(productId: $productId, title: $title, review: $review, name: $name, rating: $rating) {
    approved
    title
    rating
    review
    verifiedPurchaser
  }
}
`
export default NEW_REVIEW_MUTATION;