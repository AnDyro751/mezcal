import {useEffect, useState} from 'react';
import GetImageUrl, {generateUrlPath} from "../../../lib/getImageUrl";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {SRLWrapper} from 'simple-react-lightbox'
import {useLightbox} from 'simple-react-lightbox'

const options = {
    settings: {
        disablePanzoom: true
    },
    buttons: {
        showAutoplayButton: false,
        showCloseButton: true,
        showDownloadButton: false,
        showFullscreenButton: true,
        showNextButton: true,
        showPrevButton: true,
        showThumbnailsButton: true,
    },
    caption: {
        showCaption: true
    },
}
const getImages = (images = []) => {
    const newImages = []
    images.map((img, k) => {
        let newImage = {
            src: `${GetImageUrl({
                publicId: generateUrlPath({
                    filename: img.filename,
                    id: img.id
                }),
                height: 800,
                width: 800
            })}`,
            thumbnail: `${GetImageUrl({
                publicId: generateUrlPath({
                    filename: img.filename,
                    id: img.id
                }),
                height: 40,
                width: 40
            })}`,
        }
        newImages.push(newImage);
    })
    return newImages;
}
export default function ProductGallery({product}) {
    const {openLightbox, closeLightbox} = useLightbox()
    const [currentImage, setCurrentImage] = useState(0)
    useEffect(() => {
        return () => {
            closeLightbox();
        }
    }, [])
    return (
        <div className="w-full">
            <h1>Nombre: {product.name}</h1>
            <h3 className="text-lg font-black">
                Imágenes
            </h3>

            <LazyLoadImage
                placeholderSrc={`${GetImageUrl({
                    publicId: generateUrlPath({
                        filename: product.masterVariant.images.nodes[currentImage].filename,
                        id: product.masterVariant.images.nodes[currentImage].id
                    }),
                    height: 40,
                    width: 40
                })}`}
                wrapperClassName="cursor-pointer"
                onClick={() => {
                    setCurrentImage(currentImage);
                    openLightbox(currentImage);
                }}
                alt={`${product.masterVariant.images.nodes[currentImage].alt || `Imagen de producto: ${product.masterVariant.images.nodes[currentImage].filename} - ${product.name}`}`}
                src={`${GetImageUrl({
                    publicId: generateUrlPath({
                        filename: product.masterVariant.images.nodes[currentImage].filename,
                        id: product.masterVariant.images.nodes[currentImage].id
                    })
                })}`}
            />
            <SRLWrapper images={getImages(product.masterVariant.images.nodes)} options={options}/>
            <div className="flex space-x-4">
                {product.masterVariant.images.nodes.map((image, i) => (
                    <div key={i}
                         className="w-36">
                        <LazyLoadImage
                            placeholderSrc={`${GetImageUrl({
                                publicId: generateUrlPath({
                                    filename: image.filename,
                                    id: image.id
                                }),
                                height: 40,
                                width: 40
                            })}`}
                            wrapperClassName="cursor-pointer"
                            onClick={() => {
                                setCurrentImage(i);
                                // openLightbox(i + 1);
                            }}
                            alt={`${image.alt || `Imagen de producto: ${image.filename} - ${product.name}`}`}
                            src={`${GetImageUrl({
                                publicId: generateUrlPath({
                                    filename: image.filename,
                                    id: image.id
                                }),
                                width: 100,
                                height: 100
                            })}`}
                        />
                    </div>
                ))}
            </div>
        </div>

    )
}