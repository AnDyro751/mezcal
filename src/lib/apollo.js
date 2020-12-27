import {withApollo as createWithApollo} from "next-apollo";
import {ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client";
import cookie from 'cookie'
import {setContext} from '@apollo/client/link/context';

function parseCookies(ctx, options = {}) {
    if (ctx) {
        if (ctx.req) {
            return cookie.parse(ctx.req.headers.cookie || "", options)
        } else {
            if (typeof document === "undefined") {
                return {}
            } else {
                return cookie.parse(document.cookie, options)
            }
        }
    } else {
        return cookie.parse(document.cookie, options)
    }
}

const httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql',

});

const authLink = (ctx) => {
    return setContext((_, {headers}) => {
        return {
            credentials: "same-origin",
            headers: {
                ...headers,
                "X-Spree-Order-Token": parseCookies(ctx).authorization_guest_token
            }
        }
    });
}

const client = (ctx) => {
    return new ApolloClient({
        link: authLink(ctx).concat(httpLink),
        cache: new InMemoryCache(),
        ssrMode: typeof window === "undefined",
    });
}

const withApollo = createWithApollo(client);
export default withApollo
export {client};
