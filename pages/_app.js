import "../src/css/base.css";
import 'react-image-lightbox/style.css';
import Router from "next/router";
import NProgress from "nprogress";
import {OrderContextProvider} from "../src/stores/userOrder";
import {ToastProvider} from 'react-toast-notifications';
import Link from 'next/link'
import {DefaultToast} from 'react-toast-notifications';
import runQuery from "../src/graphql/queries/runQuery";
import {MAIN_QUERY} from "../src/graphql/queries/main";
import App from 'next/app'
import withApollo from '../src/lib/apollo'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


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

function MyApp({Component, pageProps, dataOrder}) {
    const data = dataOrder;
    return (
        <OrderContextProvider data={{order: data ? data.currentOrder ? data.currentOrder || {} : {} : {}}}>
            <ToastProvider
                components={{Toast: MyCustomToast}}
                autoDismiss={true}
            >
                <Component {...pageProps} />
            </ToastProvider>
        </OrderContextProvider>
    )
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    const dataOrder = await runQuery(MAIN_QUERY(), null, "no-cache", appContext ? appContext.ctx : null);
    return {dataOrder: dataOrder, ...appProps}
}


export default withApollo({ssr: true})(MyApp);