import {withApollo} from "next-apollo";
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

const apolloClient = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
        uri: 'http://192.168.8.88:3001/graphql', // Server URL (must be absolute)
        credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
        headers: {
            "X-Spree-Order-Token": "Yv6zj7wxkmgVQl9GLf1Tlg"
        }
    }),
    cache: new InMemoryCache({})
});

export {apolloClient};

export default withApollo(apolloClient);