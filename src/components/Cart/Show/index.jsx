import {useEffect} from 'react';

const CartShow = ({currentOrder = {}}) => {
    useEffect(() => {
        console.log(currentOrder);
    }, [])
    return (
        <div className="w-full">
            <h2>Total de items {currentOrder.lineItems.nodes.length}</h2>
        </div>
    )
}

export default CartShow