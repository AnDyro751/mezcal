import GetImageUrl, {generateUrlPath} from "../../../lib/getImageUrl";
import {LazyLoadImage} from 'react-lazy-load-image-component';

export default function ProductGallery({product}) {
    return (
        <div className="w-full">
            <h1>Nombre: {product.name}</h1>
            <h3 className="text-lg font-black">
                Imágenes
            </h3>
            {product.masterVariant.images.nodes.map((image, i) => (
                <fieldset key={i}>
                    <LazyLoadImage
                        placeholderSrc={`${GetImageUrl({
                            publicId: generateUrlPath({
                                filename: image.filename,
                                id: image.id
                            }),
                            height: 10,
                            width: 10
                        })}`}
                        alt={`${image.alt || `Imagen de producto: ${image.filename} - ${product.name}`}`}
                        src={`${GetImageUrl({
                            publicId: generateUrlPath({
                                filename: image.filename,
                                id: image.id
                            })
                        })}`}
                    />
                    <h3>fileName: {image.filename}</h3>
                </fieldset>
            ))}
        </div>
    )
}