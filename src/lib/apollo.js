import {withApollo} from "next-apollo";
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

const apolloClient = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
        uri: 'http://192.168.8.88:3001/graphql', // Server URL (must be absolute)
        credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
        headers: {
            "X-Spree-Order-Token": "kxPQ3YqCe7NPhXv47oB8Cw"
        }
    }),
    cache: new InMemoryCache({})
});

export {apolloClient};

export default withApollo(apolloClient);