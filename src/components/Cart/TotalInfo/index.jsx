export default function CartTotalInfo({currentOrder = {}}) {
    return (
        <div className="w-full px-3 py-4 bg-green-100 rounded">
            <p className="font-medium">Subtotal: <span className="font-normal">{currentOrder.total}</span></p>
            {
                currentOrder.adjustments &&
                currentOrder.adjustments.nodes.length > 0 &&
                <p className="font-medium">
                    Descuentos: <span className="font-normal">&#160;{currentOrder.adjustmentTotal}</span>
                </p>

            }
        </div>
    )
}