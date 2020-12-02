import {gql} from "@apollo/client";

export const ADD_PRODUCT_TO_CART_MUTATION = gql`
mutation{
  addToCart(input:{
    variantId:"U3ByZWU6OlZhcmlhbnQtNg==",
    quantity:1
  }){
    order{
      itemTotal
    }
  }
}
`;
