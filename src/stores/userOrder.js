import React from 'react';

export const OrderContext = React.createContext({});
export const useOrder = () => {
    const [order, setOrder] = React.useState({});
    const setCurrentOrder = React.useCallback((newOrder) => {
        setOrder(newOrder);
    }, []);
    return {
        order,
        setCurrentOrder
    }
}