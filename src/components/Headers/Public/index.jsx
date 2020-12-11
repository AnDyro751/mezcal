import Link from "next/link";
import {useContext, useEffect, useMemo} from 'react'
import {OrderContext} from "../../../stores/userOrder";
import {SITE_TITLE} from "../../../site/info";

export default function HeadersPublic() {
    const [state, dispatch] = useContext(OrderContext);
    const {order} = state;
    // useEffect(() => {
    //     console.log(order);
    // }, [state.order]);
    return (
        <header className="w-full">
            <div className="grid grid-cols-3">
                <div className="col-span-2 grid grid-cols-2">
                    <div className="col-span-1">
                        <Link href={"/"}>
                            <a>{SITE_TITLE}</a>
                        </Link>
                    </div>
                </div>
                <div className="col-span-1">
                    <Link href={"/products"}>
                        <a>Productos</a>
                    </Link>
                    |
                    <Link href={"/products/demo-1"}>
                        <a>Producto</a>
                    </Link>
                    |
                    <Link href={"/cart"}>
                        <a>Carrito({order.itemCount || 0})</a>
                    </Link>
                </div>
            </div>
        </header>
    )
}