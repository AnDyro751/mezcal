import ProductsItem from "../Item";

export default function ProductsListProducts({products = {}}) {
    return (
        <div className="w-full flex justify-center">
            <div className="w-10/12 flex space-x-4">
                {products.map((product, i) => (
                    <div className="w-3/12"
                         key={i}
                    >
                        <ProductsItem
                            product={product.node}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}