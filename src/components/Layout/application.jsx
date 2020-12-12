import HeadersPublic from "../Headers/Public";
import Head from "next/head";
import {useContext, useEffect} from 'react';
import {OrderContext} from "../../stores/userOrder";
import {SITE_TITLE} from "../../site/info";
import PagesError from "../../pages/error";
import emptyObject from "../../lib/emptyObject";

export default function LayoutApplication({children, seo = {}, currentOrder = {}, data = {}}) {
    const [state, dispatch] = useContext(OrderContext);
    useEffect(() => {
        dispatch({type: "UPDATE_ORDER", payload: currentOrder})
    }, [currentOrder])
    if (emptyObject(currentOrder) || emptyObject(data)) {
        return (
            <PagesError
                message={"Ha ocurrido un error, intenta de nuevo"}
            />
        )
    }
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