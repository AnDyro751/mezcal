import {withApollo as createWithApollo} from "next-apollo";
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import cookie from 'cookie'

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

const apolloClient = ctx => {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: new HttpLink({
            uri: 'http://192.168.8.88:3001/graphql',
            credentials: "same-origin",
            headers: {
                "X-Spree-Order-Token": parseCookies(ctx).authorization_guest_token
            }
        }),
        cache: new InMemoryCache({})
    });
}


const withApollo = createWithApollo(apolloClient)
export default withApollo
export {apolloClient};
