import HeadersPublic from "../Headers/Public";
import Head from "next/head";
import {useContext, useEffect, useMemo} from 'react';
import {OrderContext} from "../../stores/userOrder";
import {SITE_TITLE} from "../../site/info";
import emptyObject from "../../lib/emptyObject";
import PagesError from "../../pages/error";

export default function LayoutApplication({children, seo = {}, currentOrder = {}}) {
    const {state, dispatch} = useContext(OrderContext);

    // note: Se use useEffect para que al cambiar de vista se setee la nueva información y que no quede info obsoleta
    useEffect(() => {
        dispatch({type: "UPDATE_ORDER", payload: currentOrder});
    }, [currentOrder])

    if (emptyObject(currentOrder)) {
        return (
            <PagesError message={"Ha ocurrido un error"}/>
        )
    }

    return (
        <>
            <Head>
                <title>{seo.title ? `${seo.title} | ${SITE_TITLE}` : `${SITE_TITLE}`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <HeadersPublic publicOrder={currentOrder}/>
            <main>
                {children}
            </main>
        </>
    )
}

