import {gql} from '@apollo/client';

const CHECKOUT_PAGE_QUERY = gql`
query getCountryByISO($isoCode: String!) {
  currentOrder {
    shippingAddress {
      address2
      address1
      phone
      city
      country {
        id
      }
      lastname
      firstname
      zipcode
      stateName
    }
    billingAddress {
      address2
      address1
      phone
      city
      country {
        id
      }
      lastname
      firstname
      zipcode
      stateName
    }
  }
  countryByIso(isoCode: $isoCode) {
    statesRequired
    iso
    isoName
    id
    states {
      nodes {
        id
        name
      }
    }
  }
}

`;

export default CHECKOUT_PAGE_QUERY;
