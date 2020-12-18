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
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}