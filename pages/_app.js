import "../src/css/base.css";
import Router from "next/router";
import NProgress from "nprogress";
import 'nprogress/nprogress.css';
import {ApolloProvider} from '@apollo/client'
import {useApollo} from '../src/lib/apolloClient'
import {OrderContext, useOrder} from "../src/stores/userOrder";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({Component, pageProps}) {
    const apolloClient = useApollo(pageProps)
    const {order} = useOrder()
    return (
        <OrderContext.Provider value={order}>
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>
        </OrderContext.Provider>

    )
}

export default MyApp;