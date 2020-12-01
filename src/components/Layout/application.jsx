import HeadersPublic from "../Headers/Public";
import Head from "next/head";
import {useMemo} from 'react';
import {useOrder} from "../../stores/userOrder";

export default function LayoutApplication({children, seo = {}, currentOrder = {}}) {
    const {order, setCurrentOrder} = useOrder();
    useMemo(() => {
        setCurrentOrder(currentOrder);
    }, [])
    return (
        <>
            <Head>
                <title>{seo.title ? `${seo.title} | Mezcal Cazador` : `Mezcal Cazador`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <HeadersPublic/>
            <main>
                <h1>{order.itemCount || 0}</h1>
                {children}
            </main>
        </>
    )
}