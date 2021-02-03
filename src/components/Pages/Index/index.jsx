import ComponentsListProducts from "../../ListProducts";
import BannerThree from "../../BannerThree";
import BannerWelcome from "./BannerWelcome";

export default function ComponentsPagesIndex({taxonomies, products}) {
    return (
        <div className="w-full">
            <div className="w-full">
                <BannerWelcome/>
            </div>
            <div className="w-11/12 mx-auto space-y-12">
                <div className="w-full">
                    <div className="py-12">
                        <h4 className="text-base text-gray-700 mb-4 text-center main-title">Mezcal Media Noche</h4>
                        <h3 className="text-3xl font-medium text-center mb-8">Nuestros productos</h3>
                    </div>
                    <ComponentsListProducts products={products}/>
                </div>
                <div className="w-full">

                </div>
                {/*</div>*/}
            </div>
        </div>
    )
}