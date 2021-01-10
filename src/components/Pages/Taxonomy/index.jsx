export default function ComponentsPageTaxonomy({taxon}) {
    return (
        <div className="w-10/12 mx-auto mt-10">
            <h1>Taxonomy {taxon.name}</h1>
            {
                taxon.products.nodes.length <= 0 &&
                <h3>No hay productos que mostrar</h3>
            }
        </div>
    )
}