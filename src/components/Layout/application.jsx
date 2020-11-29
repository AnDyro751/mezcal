import HeadersPublic from "../Headers/Public";
import Head from "next/head"; //styles of nprogress

export default function LayoutApplication({children, seo = {}}) {

    return (
        <>
            <Head>
                <title>{seo.title ? `${seo.title} | Mezcal Oaxaca` : `Mezcal Oaxaca`}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <HeadersPublic/>
            <main>
                {children}
            </main>
        </>
    )
}