import "../src/css/base.css";
import Router from "next/router";
import NProgress from "nprogress";
import 'nprogress/nprogress.css';
import {ApolloProvider} from '@apollo/client'
import {useApollo} from '../src/lib/apolloClient'
import {OrderContext, OrderContextProvider} from "../src/stores/userOrder";
import SimpleReactLightbox from "simple-react-lightbox";
import {ToastProvider} from 'react-toast-notifications';
import Link from 'next/link'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import {DefaultToast} from 'react-toast-notifications';

const MyCustomToast = ({children, ...props}) => {
    return (
        <DefaultToast {...props}>
            <div className="w-full flex flex-wrap">
                <div className="w-full">
                    <span>{children}</span>
                </div>
                {
                    props.withtext &&
                    <div className="w-full mt-2">
                        {
                            props.withlink ?
                                <Link href={props.withlink}>
                                    <a className="underline">{props.withtext}</a>
                                </Link>
                                :
                                <span>{props.withtext}</span>
                        }
                    </div>
                }
            </div>
        </DefaultToast>
    )
};

function MyApp({Component, pageProps}) {
    // const apolloClient = useApollo(pageProps)
    const data = pageProps.data;
    return (
        // <ApolloProvider client={apolloClient}>
        <OrderContextProvider data={{order: data ? data.currentOrder || {} : {}}}>
            <SimpleReactLightbox>
                <ToastProvider
                    components={{Toast: MyCustomToast}}
                    autoDismiss={true}
                >
                    <Component {...pageProps} />
                </ToastProvider>
            </SimpleReactLightbox>
        </OrderContextProvider>
        // </ApolloProvider>

    )
}

export default MyApp;