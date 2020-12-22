import {useContext} from "react";
import {OrderContext} from "../../../stores/userOrder";

export default function CartTotalInfo({currentOrder = {}}) {
    const {state, dispatch} = useContext(OrderContext);
    const {order} = state;
    return (
        <div className="w-full px-3 py-4 bg-green-100 rounded">
            <p className="font-medium">Subtotal: <span className="font-normal">{currentOrder.total}</span></p>
            {
                order.adjustments &&
                order.adjustments.nodes.length > 0 &&
                <p className="font-medium">
                    Descuentos: <span className="font-normal">&#160;{order.adjustmentTotal}</span>
                </p>

            }
        </div>
    )
}