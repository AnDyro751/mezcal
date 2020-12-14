import {gql} from '@apollo/client';

const GET_PRODUCT_REVIEWS = gql`
query getProductReviews($slug: String!){
        productBySlug(slug: $slug) {
            reviews{
              nodes{
                name
                title
                rating
                createdAt
                approved
                review
              }
            }
        }
}
`
export default GET_PRODUCT_REVIEWS

