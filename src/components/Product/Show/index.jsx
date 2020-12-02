import ProductGallery from "../gallery";
import ProductData from "../data";


export default function ComponentsProductShow({product = {}}) {

    return (
        <div className="w-10/12 mx-auto flex space-x-4">
            <div className="w-7/12">
                <ProductGallery product={product}/>
            </div>
            <div className="w-5/12">
                <ProductData product={product}/>
            </div>
        </div>
    )
}