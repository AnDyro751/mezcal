import HeadersPublic from "../Headers/Public";
import Head from "next/head";
import {SITE_DESCRIPTION, SITE_TITLE} from "../../site/info";
import Footer from "../Footer";
import MainPromotion from "../MainPromotion";

export default function LayoutApplication({children, seo = {}, currentOrder = {}, transparentHeader = true}) {

    return (
        <>
            <Head>
                <title>{seo.title ? `${seo.title} | ${SITE_TITLE}` : `${SITE_TITLE}`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=IM+Fell+English&display=swap" rel="stylesheet"/>
                {/*TODO: Agregar el SEO y prefetch*/}
                <meta name={"description"} content={SITE_DESCRIPTION}/>
                <meta name="theme-color" content="#222222"/>
            </Head>
            <HeadersPublic publicOrder={currentOrder} transparent={transparentHeader}/>

            <main className={`${transparentHeader ? "" : "mt-32 lg:mt-44"}`}>
                {children}
            </main>

            <Footer/>
        </>
    )
}

