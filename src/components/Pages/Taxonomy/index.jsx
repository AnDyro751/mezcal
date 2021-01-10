import ProductsItem from "../../Products/Item";
import EmptyObjects from "../../EmptyObjects";
import ComponentsListTaxons from "../../ListTaxons";

export default function ComponentsPageTaxonomy({taxon, taxonomies}) {
    return (
        <div className="w-10/12 mx-auto mt-10">
            <div className="w-full flex">
                <div className="w-3/12">
                    <ComponentsListTaxons taxonomies={taxonomies}/>
                </div>
                <div className="w-9/12">
                    {
                        taxon.products.nodes.length <= 0 &&
                        <EmptyObjects message={"No hay productos que mostrar"}
                                      withButtonText={"Explorar productos"}
                                      withButton={"/products"}
                        />
                    }
                    {taxon.products.nodes.map((product, i) => (
                        <ProductsItem product={product} key={i}/>
                    ))}
                </div>
            </div>
        </div>
    )
}