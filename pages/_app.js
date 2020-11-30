import "../src/css/base.css";
import Router from "next/router";
import NProgress from "nprogress";
import 'nprogress/nprogress.css';
import {ApolloProvider} from '@apollo/client'
import {useApollo} from '../src/lib/apolloClient'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({Component, pageProps}) {
    const apolloClient = useApollo(pageProps)
    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default MyApp;