import {useEffect, useState} from 'react';
import GetImageUrl, {generateUrlPath} from "../../../lib/getImageUrl";
import dynamic from 'next/dynamic'

const Lightbox = dynamic(() => import('react-image-lightbox'), {
    ssr: false
})
const NProgress = dynamic(() => import('nprogress'), {
    ssr: false
})
export default function ProductGallery({product}) {
    const [currentImage, setCurrentImage] = useState(0)
    const [openImages, setOpenImages] = useState(false);
    useEffect(() => {
        return () => {
            setOpenImages(false);
        }
    }, [])
    return (
        <div className="w-full">
            {openImages && (
                <Lightbox
                    mainSrc={`${GetImageUrl({
                        publicId: generateUrlPath({
                            filename: product.masterVariant.images.nodes[currentImage].filename,
                            id: product.masterVariant.images.nodes[currentImage].id
                        }),
                        height: 1000,
                        width: 1000,
                        fit: "cover"
                    })}`}
                    nextSrc={`${GetImageUrl({
                        publicId: generateUrlPath({
                            filename: product.masterVariant.images.nodes[(currentImage + 1) % product.masterVariant.images.nodes.length].filename,
                            id: product.masterVariant.images.nodes[(currentImage + 1) % product.masterVariant.images.nodes.length].id
                        }),
                        height: 1000,
                        width: 1000,
                        fit: "cover"
                    })}`}
                    prevSrc={`${GetImageUrl({
                        publicId: generateUrlPath({
                            filename: product.masterVariant.images.nodes[(currentImage + product.masterVariant.images.nodes.length - 1) % product.masterVariant.images.nodes.length].filename,
                            id: product.masterVariant.images.nodes[(currentImage + product.masterVariant.images.nodes.length - 1) % product.masterVariant.images.nodes.length].id
                        }),
                        height: 1000,
                        width: 1000,
                        fit: "cover"
                    })}`}
                    onCloseRequest={() => {
                        setOpenImages(false);
                    }}
                    onMovePrevRequest={() => {
                        setCurrentImage((currentImage + product.masterVariant.images.nodes.length - 1) % product.masterVariant.images.nodes.length)
                    }}
                    onMoveNextRequest={() => {
                        setCurrentImage((currentImage + 1) % product.masterVariant.images.nodes.length)
                    }}
                />
            )}
            {
                product.masterVariant.images.nodes.length > 0 &&
                <img
                    key={"1"}
                    onClick={() => {
                        setCurrentImage(currentImage);
                        // openLightbox(currentImage);
                        setOpenImages(true);
                    }}
                    alt={`${product.masterVariant.images.nodes[currentImage].alt || `Imagen de producto: ${product.masterVariant.images.nodes[currentImage].filename} - ${product.name}`}`}
                    className="lazy cursor-pointer w-full"
                    src={`${GetImageUrl({
                        publicId: generateUrlPath({
                            filename: product.masterVariant.images.nodes[currentImage].filename,
                            id: product.masterVariant.images.nodes[currentImage].id
                        }),
                        height: 40,
                        width: 40,
                        fit: "cover"
                    })}`}
                    data-src={`${GetImageUrl({
                        publicId: generateUrlPath({
                            filename: product.masterVariant.images.nodes[currentImage].filename,
                            id: product.masterVariant.images.nodes[currentImage].id
                        }),
                        height: 1000,
                        width: 1000,
                        fit: "cover"
                    })}`}
                />
                // <LazyLoadImage
                //     placeholderSrc={`${GetImageUrl({
                //         publicId: generateUrlPath({
                //             filename: product.masterVariant.images.nodes[currentImage].filename,
                //             id: product.masterVariant.images.nodes[currentImage].id
                //         }),
                //         height: 10,
                //         width: 10,
                //         fit: "cover"
                //     })}`}
                //     wrapperClassName="cursor-pointer"
                //     onClick={() => {
                //         setCurrentImage(currentImage);
                //         // openLightbox(currentImage);
                //         setOpenImages(true);
                //     }}
                //     alt={`${product.masterVariant.images.nodes[currentImage].alt || `Imagen de producto: ${product.masterVariant.images.nodes[currentImage].filename} - ${product.name}`}`}
                //     src={`${GetImageUrl({
                //         publicId: generateUrlPath({
                //             filename: product.masterVariant.images.nodes[currentImage].filename,
                //             id: product.masterVariant.images.nodes[currentImage].id
                //         }),
                //         height: 1000,
                //         width: 1000,
                //         fit: "cover"
                //     })}`}
                // />
            }

            <div className="flex space-x-4 mt-4">
                {product.masterVariant.images.nodes.map((image, i) => (
                    <div key={i}
                         className="w-36">
                        <img
                            alt={`${image.alt || `Imagen de producto: ${image.filename} - ${product.name}`}`}
                            className="lazy cursor-pointer w-full"
                            data-src={`${GetImageUrl({
                                publicId: generateUrlPath({
                                    filename: image.filename,
                                    id: image.id
                                }),
                                height: 100,
                                width: 100,
                                fit: "cover"
                            })}`}
                            src={`${GetImageUrl({
                                publicId: generateUrlPath({
                                    filename: image.filename,
                                    id: image.id
                                }),
                                height: 40,
                                width: 40,
                                fit: "cover"
                            })}`}
                        />
                        {/*<LazyLoadImage*/}
                        {/*    placeholderSrc={`${GetImageUrl({*/}
                        {/*        publicId: generateUrlPath({*/}
                        {/*            filename: image.filename,*/}
                        {/*            id: image.id*/}
                        {/*        }),*/}
                        {/*        height: 40,*/}
                        {/*        width: 40*/}
                        {/*    })}`}*/}
                        {/*    wrapperClassName="cursor-pointer"*/}
                        {/*    onClick={() => {*/}
                        {/*        setCurrentImage(i);*/}
                        {/*        NProgress.start()*/}
                        {/*        setTimeout(() => {*/}
                        {/*            NProgress.done()*/}
                        {/*        }, 500)*/}
                        {/*        // openLightbox(i + 1);*/}
                        {/*    }}*/}
                        {/*    alt={`${image.alt || `Imagen de producto: ${image.filename} - ${product.name}`}`}*/}
                        {/*    src={`${GetImageUrl({*/}
                        {/*        publicId: generateUrlPath({*/}
                        {/*            filename: image.filename,*/}
                        {/*            id: image.id*/}
                        {/*        }),*/}
                        {/*        width: 100,*/}
                        {/*        height: 100,*/}
                        {/*        fit: "cover"*/}
                        {/*    })}`}*/}
                        {/*/>*/}
                    </div>
                ))}
            </div>
        </div>

    )
}