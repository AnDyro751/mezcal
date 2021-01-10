import ComponentsTaxon from "./Taxon";

export default function ComponentsListTaxons({taxonomies}) {
    return (
        <div className="w-full space-y-4">
            {
                taxonomies.nodes.map((taxonomy, i) => (
                    <ComponentsTaxon taxonomy={taxonomy} key={i}/>
                ))
            }
        </div>
    )
}