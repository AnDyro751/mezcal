import OnePageStepper from "../Stepper";

export default function CheckoutOnePagePayment(){
    return(
        <div className="w-full" >
            <OnePageStepper text={"4. Pago"} open={false}>
            </OnePageStepper>
        </div>
    )
}