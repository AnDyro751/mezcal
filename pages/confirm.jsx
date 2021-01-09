import LayoutApplication from "../src/components/Layout/application";
import CheckoutLayout from "../src/components/Layout/checkout";

export default function PagesConfirm({data}) {
    return (
        <LayoutApplication>
            <CheckoutLayout>
                <div className="w-full">
                    <h2>Confirmar orden</h2>
                </div>
            </CheckoutLayout>
        </LayoutApplication>
    )
}