import GetImageUrl, {generateUrlPath} from "../../../lib/getImageUrl";
import {LazyLoadImage} from "react-lazy-load-image-component";
import Link from 'next/link'
import AddProductToCart from "../../Buttons/AddProductToCart";

export default function ProductsItem({product = {}}) {
    const {masterVariant} = product
    const images = masterVariant.images.nodes.slice(1);
    return (
        <div className="w-full">
            {images.length > 0 &&
            <Link href={`/products/${product.slug}`}>
                <a>
                    <LazyLoadImage
                        placeholderSrc={`${GetImageUrl({
                            publicId: generateUrlPath({
                                filename: product.masterVariant.images.nodes[0].filename,
                                id: product.masterVariant.images.nodes[0].id
                            }),
                            height: 10,
                            width: 10,
                            fit: "cover"
                        })}`}
                        wrapperClassName="cursor-pointer w-full h-64 border"
                        alt={`${product.masterVariant.images.nodes[0].alt || `Imagen de producto: ${product.masterVariant.images.nodes[0].filename} - ${product.name}`}`}
                        src={`${GetImageUrl({
                            publicId: generateUrlPath({
                                filename: product.masterVariant.images.nodes[0].filename,
                                id: product.masterVariant.images.nodes[0].id
                            }),
                            height: 200,
                            width: 200,
                            fit: "cover"
                        })}`}
                    />
                </a>
            </Link>
            }
            <div className="w-full mt-2">
                <h3 className="text-center uppercase font-normal text-gray-800">
                    <Link href={`/products/${product.slug}`}>
                        <a>
                            {product.name}
                        </a>
                    </Link>
                </h3>
                {
                    product.masterVariant &&
                    product.masterVariant.defaultPrice &&
                    <h4 className="text-sm text-center mt-3 text-gray-500 uppercase">
                        <Link href={`/products/${product.slug}`}>
                            <a>{product.masterVariant.defaultPrice.displayAmount} {product.masterVariant.defaultPrice.currency.isoCode}</a>
                        </Link>
                    </h4>
                }
            </div>
            <div className="w-full mt-4">
                <AddProductToCart product={product}/>
            </div>
        </div>
    )
}