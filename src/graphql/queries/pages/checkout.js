import {gql} from '@apollo/client';

const CHECKOUT_PAGE_QUERY = gql`
query getCountryByISO($isoCode:String!){
  countryByIso(isoCode:$isoCode){
    statesRequired
    iso
    isoName
    id
    states{
      nodes{
        id
        name
      }
    }
  }
}
`;

export default CHECKOUT_PAGE_QUERY;
