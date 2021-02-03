import GetImageUrl, {generateUrlPath} from "../../../lib/getImageUrl";
import Link from 'next/link'
import AddProductToCart from "../../Buttons/AddProductToCart";
import {useEffect} from "react";
import updateLazyLoad from "../../../lib/updateLazyLoad";

export default function ProductsItem({product = {}}) {
    const {masterVariant} = product;
    const image = masterVariant.images.nodes[0];

    useEffect(() => {
        updateLazyLoad();
    });

    return (
        <div className="w-full">
            {image &&
            <Link href={`/products/${product.slug}`}>
                <a className="rounded shadow">
                    <img
                        className="lazy h-48 md:h-72 rounded lg:h-72 2xl:h-80 w-full bg-white"
                        srcSet={`${GetImageUrl({
                            publicId: generateUrlPath({
                                filename: image.filename,
                                id: image.id
                            }),
                            height: 400,
                            width: 400,
                            fit: "cover"
                        })} 400w, ${GetImageUrl({
                            publicId: generateUrlPath({
                                filename: image.filename,
                                id: image.id
                            }),
                            height: 600,
                            width: 600,
                            fit: "cover"
                        })} 720w, ${GetImageUrl({
                            publicId: generateUrlPath({
                                filename: image.filename,
                                id: image.id
                            }),
                            height: 600,
                            width: 600,
                            fit: "cover"
                        })} 900w,
                        
                               ${GetImageUrl({
                            publicId: generateUrlPath({
                                filename: image.filename,
                                id: image.id
                            }),
                            height: 800,
                            width: 800,
                            fit: "cover",
                        })} 1280w,
                               ${GetImageUrl({
                            publicId: generateUrlPath({
                                filename: image.filename,
                                id: image.id
                            }),
                            height: 800,
                            width: 800,
                            fit: "cover",
                        })} 1512w
                               `}

                        src={`${GetImageUrl({
                            publicId: generateUrlPath({
                                filename: image.filename,
                                id: image.id
                            }),
                            height: 40,
                            width: 30,
                            fit: "cover"
                        })}`}
                        data-sizes="100w"
                        alt={`Imagen del producto: ${product.name}, ${product.slug}`}/>
                    {/*<LazyLoadImage*/}
                    {/*    placeholderSrc={`${GetImageUrl({*/}
                    {/*        publicId: generateUrlPath({*/}
                    {/*            filename: image.filename,*/}
                    {/*            id: image.id*/}
                    {/*        }),*/}
                    {/*        height: 20,*/}
                    {/*        width: 10,*/}
                    {/*        fit: "cover"*/}
                    {/*    })}`}*/}
                    {/*    wrapperClassName="cursor-pointer w-full rounded"*/}
                    {/*    className="h-64 md:h-80 w-full"*/}
                    {/*    alt={`${image.alt || `Imagen de producto: ${image.filename} - ${product.name}`}`}*/}
                    {/*    src={`${GetImageUrl({*/}
                    {/*        publicId: generateUrlPath({*/}
                    {/*            filename: image.filename,*/}
                    {/*            id: image.id*/}
                    {/*        }),*/}
                    {/*        height: 400,*/}
                    {/*        width: 200,*/}
                    {/*        fit: "cover"*/}
                    {/*    })}`}*/}
                    {/*/>*/}
                </a>
            </Link>
            }
            <div className="w-full mt-4">
                <h3 className="text-center uppercase font-medium md:font-normal text-gray-800">
                    <Link href={`/products/${product.slug}`}>
                        <a>
                            {product.name}
                        </a>
                    </Link>
                </h3>
                {
                    product.masterVariant &&
                    product.masterVariant.defaultPrice &&
                    <h4 className="text-sm lg:text-sm text-center mt-3 text-gray-700 uppercase">
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