import OnePageStepper from "../Stepper";

export default function CheckoutOnePagePayment({currentOrder}) {
    return (
        <div className="w-full">
            <OnePageStepper
                text={"4. Pago"} open={false}>
                <div className="w-full space-y-4">
                    {currentOrder.availablePaymentMethods.nodes.map((paymentMethod, i) => (
                        <div key={i} className="w-full">
                            {
                                paymentMethod.partialName === "gateway" &&
                                <CardGateway paymentMethod={paymentMethod}/>
                            }
                        </div>
                    ))}
                </div>
            </OnePageStepper>
        </div>
    )
}


const CardGateway = ({paymentMethod}) => (
    <div className="w-full flex space-x-3 items-center border px-3 py-3 rounded border-gray-300">
        <div className="w-1/12">
            <div className="w-12 h-8 rounded bg-gray-200 animate-pulse"></div>
        </div>
        <div className="w-10/12">
            {paymentMethod.name}
        </div>
    </div>
)
