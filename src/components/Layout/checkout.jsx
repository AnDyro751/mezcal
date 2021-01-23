import DataSidebar from "../Checkout/DataSidebar";

export default function CheckoutLayout({children}) {
    return (
        <div className="w-11/12 mt-10 mx-auto space-x-4 flex justify-between">
            <div className="w-5/12">
                {children}
            </div>
            <div className="w-6/12">
                <DataSidebar/>
            </div>
        </div>
    )
}