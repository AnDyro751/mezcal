import HeadersPublic from "../Headers/Public";
import Head from "next/head";
import {useMemo, useContext, useEffect} from 'react';
import {OrderContext} from "../../stores/userOrder";
import {SITE_TITLE} from "../../site/info";

export default function LayoutApplication({children, seo = {}, currentOrder = {}}) {
    const [state, dispatch] = useContext(OrderContext);
    useEffect(() => {
        dispatch({type: "UPDATE_ORDER", payload: currentOrder})
    }, [currentOrder])
    return (
        <>
            <Head>
                <title>{seo.title ? `${seo.title} | ${SITE_TITLE}` : `${SITE_TITLE}`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <HeadersPublic/>
            <main>
                {children}
            </main>
        </>
    )
}