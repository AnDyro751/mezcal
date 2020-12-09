import {useEffect} from 'react';
import Link from 'next/link'
import {LazyLoadImage} from "react-lazy-load-image-component";
import GetImageUrl, {generateUrlPath} from "../../../lib/getImageUrl";
import {CounterSelector} from "../../Buttons/CounterSelector";

const CartShow = ({currentOrder = {}}) => {
    useEffect(() => {
        console.log(currentOrder);
    }, [])
    return (
        <div className="w-full">
            <div className="flex justify-center py-8">
                <h1 className="text-3xl font-medium">Carrito</h1>
            </div>
            <div className="w-full flex border-b pb-4 border-gray-200 mb-6">
                <div className="w-6/12">
                    <span className="text-sm uppercase text-gray-400">Producto</span>
                </div>
                <div className="w-3/12">
                    <span className="text-sm uppercase text-gray-400">Cantidad</span>
                </div>
                <div className="w-3/12">
                    <span className="text-sm uppercase text-gray-400">Total</span>
                </div>
            </div>
            <div className="w-full flex flex-wrap">
                {/*<div className="w-6/12 flex flex-wrap">*/}
                {
                    currentOrder.lineItems.nodes.map((lineItem, i) => (
                        <div className="w-full flex mb-5" key={i}>
                            <div className="w-6/12 flex">
                                <div className="w-4/12">
                                    {
                                        lineItem.product.masterVariant.images.nodes.length > 0 &&
                                        <Link href={`/products/${lineItem.product.slug}`}>
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
                                <div className="w-8/12">
                                    <Link href={`/products/${lineItem.product.slug}`}>
                                        <a className="mb-2">
                                            <span className="uppercase">{lineItem.product.name}</span>
                                        </a>
                                    </Link>
                                    <p className="mt-2">
                                    <span className="text-xs text-gray-500">
                                        {lineItem.displayPriceAmount} {lineItem.currency}
                                    </span>
                                    </p>
                                </div>
                            </div>
                            <div className="w-3/12">
                                <CounterSelector
                                    big={false}
                                    defaultValue={lineItem.quantity}
                                    handleChange={() => {
                                    }}
                                />
                            </div>
                        </div>
                    ))
                }
                {/*</div>*/}
            </div>
        </div>
    )
}

export default CartShow