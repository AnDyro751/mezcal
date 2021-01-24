import {useEffect, useState} from 'react';
import GetImageUrl, {generateUrlPath} from "../../../lib/getImageUrl";
import dynamic from 'next/dynamic'
import NProgress from 'nprogress'
import updateLazyLoad, {destroyLazyLoad} from "../../../lib/updateLazyLoad";

const Lightbox = dynamic(() => import('react-image-lightbox'), {
    ssr: false
})

export default function ProductGallery({product}) {
    const [currentImage, setCurrentImage] = useState(0)
    const [openImages, setOpenImages] = useState(false);

    useEffect(() => {
        if (openImages) {
            document.querySelector("body").classList.add("overflow-hidden");
        } else {
            document.querySelector("body").classList.remove("overflow-hidden");
        }
    }, [openImages])

    useEffect(() => {
        // destroyLazyLoad();
        // updateLazyLoad();
        console.log("ACTUALIZAR IMAGEN");
    }, [currentImage])

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
                    id={"current_image"}
                    onClick={() => {
                        setCurrentImage(currentImage);
                        // openLightbox(currentImage);
                        setOpenImages(true);
                        destroyLazyLoad(document.querySelector("#current_image"))
                        // updateLazyLoad();
                    }}
                    alt={`${product.masterVariant.images.nodes[currentImage].alt || `Imagen de producto: ${product.masterVariant.images.nodes[currentImage].filename} - ${product.name}`}`}
                    className="lazy cursor-pointer w-full border-2 border-black md:border-0"
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
                         className="md:w-36 w-20">
                        <img
                            alt={`${image.alt || `Imagen de producto: ${image.filename} - ${product.name}`}`}
                            className="lazy cursor-pointer w-full md:border-0 border-2 border-black"
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
                            onClick={() => {
                                setCurrentImage(i);
                                // destroyLazyLoad();
                                NProgress.start();
                                setTimeout(() => {
                                    NProgress.done()
                                }, 500);
                                destroyLazyLoad(document.querySelector("#current_image"))

                            }}
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