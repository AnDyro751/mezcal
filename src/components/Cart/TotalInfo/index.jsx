export default function CartTotalInfo({currentOrder = {}}) {
    return (
        <div className="w-full px-3 py-4 bg-green-100 rounded">
            <p className="font-medium">Subtotal: <span className="font-normal">{currentOrder.total}</span></p>
            {
                currentOrder.adjustments &&
                currentOrder.adjustments.nodes.filter((el) => el.eligible === true).length > 0 &&
                <p className="font-medium">
                    Descuentos: <span className="font-normal">&#160;{currentOrder.adjustmentTotal}</span>
                </p>

            }
        </div>
    )
}