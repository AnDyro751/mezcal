import ProductsItem from "../Products/Item";

export default function ComponentsListProducts({products}) {
    return (
        <div className="w-full flex space-x-4">

            {
                products.map((product, i) => (
                    <div className="w-4/12"
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