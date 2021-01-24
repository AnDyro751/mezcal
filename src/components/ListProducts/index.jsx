import ProductsItem from "../Products/Item";

export default function ComponentsListProducts({products}) {
    return (
        <div className="w-full flex space-x-3 lg:space-x-4">

            {
                products.map((product, i) => (
                    <div className="w-6/12 md:w-6/12 lg:w-3/12"
                         key={i}
                    >
                        <ProductsItem
                            product={product}
                        />
                    </div>
                ))
            }
        </div>
    )
}