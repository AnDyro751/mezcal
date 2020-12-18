import ApplyCoupon from "../ApplyCoupon";

export default function CartCouponsInfo({currentOrder = {}}) {
    return (
        <div className="w-full">
            {currentOrder.adjustments.nodes.map((adjustment, i) => (
                <div
                    key={i}
                    className="w-full"><strong>{adjustment.label}:</strong>&#160;&#160;<span>{adjustment.amount}</span>
                    {
                        adjustment.promotionCode &&
                        <div className="">
                            <span>Cupón: {adjustment.promotionCode.value}</span>
                            &#160;&#160;<span>-Eliminar-</span>
                        </div>
                    }
                </div>
            ))}
            <ApplyCoupon currentOrder={currentOrder}/>
        </div>
    )
}