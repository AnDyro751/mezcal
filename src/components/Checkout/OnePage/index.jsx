import OnePageListProducts from "./ListProducts";
import OnePageAddressForm from "./AddressForm";
import OnePageListProductsLoader from "./Loaders/ListProductsLoader";
import OnePageDataCheckout from "./Data";

export default function ComponentsCheckoutOnePage({}) {
    return (
        <div className="w-10/12 justify-between mx-auto flex mt-10 space-x-5">
            <div className="w-6/12">
                <OnePageAddressForm/>
            </div>
            <div className="w-4/12">
                <OnePageDataCheckout/>
            </div>
        </div>
    )
}