import OnePageListProducts from "./ListProducts";
import OnePageAddressForm from "./AddressForm";
import OnePageListProductsLoader from "./Loaders/ListProductsLoader";
import OnePageDataCheckout from "./Data";
import OnePageUserData from "./UserData";

export default function ComponentsCheckoutOnePage({}) {
    return (
        <div className="w-10/12 justify-between mx-auto flex mt-10 space-x-6">
            <div className="w-8/12 space-y-8">
                <OnePageUserData/>
                <OnePageAddressForm/>
            </div>
            <div className="w-4/12">
                <OnePageDataCheckout/>
            </div>
        </div>
    )
}