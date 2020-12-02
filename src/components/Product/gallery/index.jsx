import GetImageUrl, {generateUrlPath} from "../../../lib/getImageUrl";

export default function ProductGallery({product}) {
    return (
        <div className="w-full">
            <h1>Nombre: {product.name}</h1>
            <h3 className="text-lg font-black">
                Imágenes
            </h3>
            {product.masterVariant.images.nodes.map((image, i) => (
                <fieldset key={i}>
                    <img src={`${GetImageUrl({
                        publicId: generateUrlPath({
                            filename: image.filename,
                            id: image.id
                        })
                    })}`} alt={`${image.alt || `Imagen de producto: ${image.filename} - ${product.name}`}`}/>
                    <h3>fileName: {image.filename}</h3>
                </fieldset>
            ))}
        </div>
    )
}