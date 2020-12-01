import React from 'react';

export const CartContext = React.createContext({});
export const useCart = () => {
    const [cart, setCart] = React.useState({});
    const setCurrentCart = React.useCallback((newCart) => {
        setCart(newCart);
    }, []);
    return {
        cart,
        setCurrentCart
    }
}