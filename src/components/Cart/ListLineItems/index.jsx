import {useState, useEffect} from 'react';
import Link from "next/link";
import {LazyLoadImage} from "react-lazy-load-image-component";
import GetImageUrl, {generateUrlPath} from "../../../lib/getImageUrl";
import {CounterSelector} from "../../Buttons/CounterSelector";
import EmptyObjects from "../../EmptyObjects";

const CartListLineItems = ({currentOrder = {}}) => {
    const [lineItems, setLineItems] = useState(currentOrder.lineItems.nodes || []);
    useEffect(() => {
        setLineItems(currentOrder.lineItems.nodes || [])
    }, [currentOrder])
    if (lineItems.length <= 0) {
        return (
            <div className={"min-h-screen items-center flex"}>
                <EmptyObjects message={"Tu carrito está vacío"} withButton={"/products"}
                              withButtonText={"Ver productos"}/>
            </div>
        )
    }
    return (
        <>
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

                {
                    lineItems.map((lineItem, i) => (
                        <div className="w-full flex mb-5 items-center" key={i}>
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
                                <div className="w-8/12 flex items-center">
                                    <div className="w-full">
                                        <Link href={`/products/${lineItem.product.slug}`}>
                                            <a className="mb-2 w-full">
                                                <span className="uppercase">{lineItem.product.name}</span>
                                            </a>
                                        </Link>
                                        <p className="mt-2 w-full">
                                    <span className="text-xs text-gray-500">
                                        {lineItem.displayPriceAmount} {lineItem.currency}
                                    </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-3/12">
                                <CounterSelector
                                    lineItem={lineItem}
                                    big={false}
                                    defaultValue={lineItem.quantity}
                                    handleUpdateLineItems={(e) => {
                                        setLineItems(e.nodes)
                                    }}
                                    handleChange={() => {
                                    }}
                                />
                            </div>
                        </div>

                    ))
                }
            </div>
        </>

    )

}
export default CartListLineItems