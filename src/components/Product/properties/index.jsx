const ProductProperties = ({product = {}}) => {
    const properties = product.productProperties.nodes;
    if (properties.length > 0) {
        return (
            <div className="w-full mt-6">
                <h3 className="mb-4 text-3xl font-bold">Características</h3>
                <ul className="">
                    {
                        properties.map((property, i) => (
                            <li className="my-2" key={i}>
                                <strong
                                    className="font-medium">{property.property.name}:</strong>&#160;&#160;{property.value}
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    } else {
        return null
    }

}

export default ProductProperties