import ComponentsListTaxons from "../../ListTaxons";

export default function ComponentsPagesIndex({taxonomies}) {
    return (
        <div className="w-10/12 mx-auto mt-10 flex space-x-8">
            <div className="w-4/12">
                <ComponentsListTaxons taxonomies={taxonomies}/>
            </div>
        </div>
    )
}