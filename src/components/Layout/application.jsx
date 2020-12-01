import HeadersPublic from "../Headers/Public";
import Head from "next/head";
import {useContext} from 'react'
import {CartContext, useCart} from "../../stores/useCart";
import {useEffect, useMemo} from 'react';

export default function LayoutApplication({children, seo = {}, currentCart = {}}) {
    const {cart, setCurrentCart} = useCart();
    // console.log(cart, setCurrentCart)
    useMemo(() => {
        setCurrentCart(currentCart);
        console.log(currentCart);
    }, [])
    return (
        <>
            <CartContext.Provider value={currentCart}>
                <Head>
                    <title>{seo.title ? `${seo.title} | Mezcal Oaxaca` : `Mezcal Oaxaca`}</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                </Head>
                <HeadersPublic/>
                <main>
                    <h1>{cart.quantity || 0}</h1>
                    {children}
                </main>
            </CartContext.Provider>
        </>
    )
}