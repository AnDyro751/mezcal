import HeadersPublic from "../Headers/Public";
import Head from "next/head";
import {SITE_TITLE} from "../../site/info";

export default function LayoutApplication({children, seo = {}, currentOrder = {}}) {

    return (
        <>
            <Head>
                <title>{seo.title ? `${seo.title} | ${SITE_TITLE}` : `${SITE_TITLE}`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500&display=swap"
                      rel="stylesheet"/>
                {/*TODO: Agregar el SEO y prefetch*/}
            </Head>
            <HeadersPublic publicOrder={currentOrder}/>
            <main>
                {children}
            </main>
        </>
    )
}

