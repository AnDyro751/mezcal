export default function ProductsListProducts({products = {}}) {
    return (
        <div className="w-full">
            <h3>{products.length} productos</h3>
        </div>
    )
}