import Link from "next/link";
import {LazyLoadImage} from "react-lazy-load-image-component";
import GetImageUrl, {generateUrlPath} from "../../../lib/getImageUrl";
import CounterSelector from "../../Buttons/CounterSelector";

function getSku(lineItem) {
    // if(lineItem){}
    if (lineItem) {
        if (lineItem.variant) {
            if (lineItem.variant.isMaster) {
                return null;
            } else {
                return lineItem.variant.sku || null
            }
        }
    }
    return null
}

function CartLineItem({lineItem, handleLineItems}) {
    console.log(lineItem, "LINEITEM")
    return (
        <div className="w-full flex mb-5 items-center">
            <div className="w-6/12 flex">
                <div className="w-4/12">
                    {
                        lineItem.product.masterVariant.images.nodes.length > 0 &&
                        <Link
                            href={`/products/${lineItem.product.slug}${getSku(lineItem) ? `?variant=${getSku(lineItem)}` : ""}`}>
                            <a>
                                <LazyLoadImage
                                    placeholderSrc={`${GetImageUrl({
                                        publicId: generateUrlPath({
                                            filename: lineItem.product.masterVariant.images.nodes[0].filename,
                                            id: lineItem.product.masterVariant.images.nodes[0].id
                                        }),
                                        height: 40,
                                        width: 40,
                                        fit: "cover"
                                    })}`}
                                    wrapperClassName="w-32 h-32 hover:shadow-lg rounded transition duration-150"
                                    alt={`${lineItem.product.masterVariant.images.nodes[0].alt || `Imagen de producto: ${lineItem.product.masterVariant.images.nodes[0].filename} - ${lineItem.product.name}`}`}
                                    src={`${GetImageUrl({
                                        publicId: generateUrlPath({
                                            filename: lineItem.product.masterVariant.images.nodes[0].filename,
                                            id: lineItem.product.masterVariant.images.nodes[0].id
                                        }),
                                        height: 150,
                                        width: 150,
                                        fit: "cover"
                                    })}`}
                                />
                            </a>
                        </Link>
                    }
                </div>
                <div className="w-8/12 flex items-center">
                    <div className="w-full">
                        <Link
                            href={`/products/${lineItem.product.slug}${getSku(lineItem) ? `?variant=${getSku(lineItem)}` : ""}`}>
                            <a className="mb-2 w-full">
                                <span className="uppercase">{lineItem.product.name}</span>
                            </a>
                        </Link>
                        <p className="mt-2 w-full">
                                    <span className="text-xs text-gray-500">
                                        {lineItem.displayPriceAmount} {lineItem.currency}
                                    </span>
                        </p>
                        {
                            lineItem.variant &&
                            lineItem.variant.sku &&
                            <p className="text-xs mt-3 text-gray-600 uppercase">SKU: {lineItem.variant.sku}</p>
                        }
                        {
                            !lineItem.hasSufficientStock &&
                            <p className="mt-2">
                                <span className="bg-red-600 px-2 py-1 rounded text-white text-xs">Sin stock</span>
                            </p>

                        }
                    </div>
                </div>
            </div>
            <div className="w-3/12">
                <CounterSelector
                    lineItem={lineItem}
                    big={false}
                    defaultValue={lineItem.quantity}
                    handleUpdateLineItems={handleLineItems}
                    handleChange={() => {
                    }}
                />
            </div>
        </div>
    )
}

export default CartLineItem