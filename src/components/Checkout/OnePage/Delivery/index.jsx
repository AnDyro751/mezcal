import OnePageStepper from "../Stepper";

export default function OnePageDelivery({}) {
    return (
        <div className="w-full space-y-4">
            <OnePageStepper text={"3. Método de envío"} open={false}>
            </OnePageStepper>
        </div>
    )
}