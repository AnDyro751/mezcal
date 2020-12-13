import {withApollo} from "next-apollo";
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

const apolloClient = new ApolloClient({
    ssrMode: true,//typeof window === "undefined",
    link: new HttpLink({
        uri: 'http://localhost:3001/graphql', // Server URL (must be absolute)
        credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
        headers: {
            "X-Spree-Order-Token": "E9RUyOKqFWVN1zmcqxqvXQ"
        }
    }),
    cache: new InMemoryCache({})
});

export default withApollo(apolloClient);