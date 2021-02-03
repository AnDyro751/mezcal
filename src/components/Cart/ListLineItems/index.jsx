import {useState, useEffect} from 'react';
import EmptyObjects from "../../EmptyObjects";
import CartLineItem from "../LineItem";
import emptyObject from "../../../lib/emptyObject";


const CartListLineItems = ({currentOrder = {}}) => {
    const [lineItems, setLineItems] = useState(emptyObject(currentOrder) ? [] : currentOrder.lineItems.nodes || []);
    console.log(currentOrder, "CUR")
    useEffect(() => {
        if (!emptyObject(currentOrder)) {
            setLineItems(currentOrder.lineItems.nodes || [])
        }
    }, [currentOrder])
    if (lineItems.length <= 0) {
        return (
            <div className={"min-h-screen items-center flex"}>
                <EmptyObjects message={"Tu carrito está vacío"} withButton={"/products"}
                              withButtonText={"Ver productos"}/>
            </div>
        )
    }
    return (
        <>
            <div className="w-full flex border-b pb-4 border-gray-200 mb-6">
                <div className="w-6/12">
                    <span className="text-sm uppercase text-gray-400">Producto</span>
                </div>
                <div className="w-3/12">
                    <span className="text-sm uppercase text-gray-400">Cantidad</span>
                </div>
                <div className="w-3/12">
                    <span className="text-sm uppercase text-gray-400">Total</span>
                </div>
            </div>
            <div className="w-full flex flex-wrap">

                {
                    lineItems.map((lineItem, i) => (
                        <CartLineItem lineItem={lineItem} key={i} handleLineItems={(e) => {
                            setLineItems(e.nodes);
                            console.log(e.nodes);
                        }}/>
                    ))
                }
            </div>
        </>

    )

}
export default CartListLineItems