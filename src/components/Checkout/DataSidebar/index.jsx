import {useContext} from "react";
import {OrderContext} from "../../../stores/userOrder";
import InputCoupon from "../OnePage/InputCoupon";
import CheckoutShippingSelected from "../ShippingSelected";
import CartCouponsInfo from "../../Cart/CouponsInfo";
import CheckoutListCoupons from "../ListCoupons";

export default function DataSidebar({}) {
    const {state, dispatch} = useContext(OrderContext);
    return (
        <div className="w-full">
            <h2>Current Step: {state.order.state}</h2>
            <h1 className="text-3xl uppercase font-medium">Total: <span
                className="">{state.order.total} {state.order.currency}</span></h1>
            {
                state.order &&
                state.order.adjustmentTotal &&
                state.order.adjustmentTotal.length > 0 &&
                <h2>Descuentos: {state.order.adjustmentTotal}</h2>
            }

            {
                state.order &&
                state.order.shipments &&
                <>
                    {
                        state.order.shipments.nodes.map((shipment, i) => (
                            <CheckoutShippingSelected key={i} shipping={shipment}/>
                        ))
                    }
                    <InputCoupon/>
                    <CheckoutListCoupons/>
                </>
            }
        </div>
    )
}