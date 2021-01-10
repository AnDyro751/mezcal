import ComponentsListTaxons from "../../ListTaxons";
import ComponentsListProducts from "../../ListProducts";

export default function ComponentsPagesIndex({taxonomies, products}) {
    return (
        <div className="w-10/12 mx-auto mt-10 flex space-x-4">
            <div className="w-3/12">
                <ComponentsListTaxons taxonomies={taxonomies}/>
            </div>
            <div className="w-9/12">
                <ComponentsListProducts products={products}/>
            </div>
        </div>
    )
}