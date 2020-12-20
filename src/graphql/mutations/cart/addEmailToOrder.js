import {gql} from '@apollo/client';

const ADD_EMAIL_TO_ORDER = gql`
mutation addEmailToOrder($email: String!) {
  setOrderEmail(input: {email: $email}) {
    order {
      email
    }
    errors {
      path
      message
    }
  }
}
`

export default ADD_EMAIL_TO_ORDER;