import Link from "next/link";
import {useContext, useEffect} from 'react'
import {OrderContext} from "../../../stores/userOrder";

export default function HeadersPublic() {
    const [state, dispatch] = useContext(OrderContext);
    const {order} = state;
    useEffect(() => {
        console.log(order);
    }, [state.order]);
    return (
        <header className="w-full">
            <div className="grid grid-cols-3">
                <div className="col-span-2 grid grid-cols-2">
                    <div className="col-span-1">
                        <Link href={"/"}>
                            <a>Mezcal</a>
                        </Link>
                    </div>
                </div>
                <div className="col-span-1">
                    <Link href={"/products/125"}>
                        <a>Producto</a>
                    </Link>
                    <h1>{order.itemCount || 0}</h1>

                </div>
            </div>
        </header>
    )
}