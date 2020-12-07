import "../src/css/base.css";
import Router from "next/router";
import NProgress from "nprogress";
import 'nprogress/nprogress.css';
import {ApolloProvider} from '@apollo/client'
import {useApollo} from '../src/lib/apolloClient'
import {OrderContext, OrderContextProvider} from "../src/stores/userOrder";
import SimpleReactLightbox from "simple-react-lightbox";
import {ToastProvider} from 'react-toast-notifications';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({Component, pageProps}) {
    const apolloClient = useApollo(pageProps)
    const data = pageProps.data;
    return (
        <ApolloProvider client={apolloClient}>
            <OrderContextProvider data={{order: data ? data.currentOrder || {} : {}}}>
                <SimpleReactLightbox>
                    <ToastProvider
                        autoDismiss={true}
                    >
                        <Component {...pageProps} />
                    </ToastProvider>
                </SimpleReactLightbox>
            </OrderContextProvider>
        </ApolloProvider>

    )
}

export default MyApp;