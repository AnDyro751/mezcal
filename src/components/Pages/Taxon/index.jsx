import BreadCrumbs from "../../Breadcrumbs";
import {useRouter} from 'next/router'
import {useQuery} from "@apollo/client";
import GET_TAXONOMY_BY_PERMALINK_QUERY from "../../../graphql/queries/pages/taxonomy";
import ComponentsListTaxons from "../../ListTaxons";
import EmptyObjects from "../../EmptyObjects";
import ProductsItem from "../../Products/Item";

export default function ComponentsPageTaxon({}) {
    const router = useRouter();
    console.log(router, `/t/${router.query.slug}/${router.query.taxon}`);
    const {data, loading, error} = useQuery(GET_TAXONOMY_BY_PERMALINK_QUERY, {
        variables: {
            permalink: `${router.query.slug}/${router.query.taxon}`
        }
    });
    console.log(data)
    return (
        <div className="w-10/12 mx-auto mt-10 space-y-4">
            {
                data &&
                <>
                    <div className="w-full">
                        <BreadCrumbs options={
                            [
                                {title: "Inicio", href: "/"},
                                {title: "Productos", href: "/products"},
                                {
                                    title: data.taxonByPermalink ? data.taxonByPermalink.parentTaxon.name : "Desconocido",
                                    href: `/t/${data.taxonByPermalink ? data.taxonByPermalink.parentTaxon.permalink : ""}`
                                },
                                {
                                    title: data.taxonByPermalink.name,
                                    href: `/t/${data.taxonByPermalink.permalink}`
                                }
                            ]
                        }
                        />
                    </div>
                    <div className="w-full flex">
                        <div className="w-3/12">
                            <ComponentsListTaxons taxonomies={data.taxonomies}/>
                        </div>
                        <div className="w-9/12">
                            {
                                data.taxonByPermalink.products.nodes.length <= 0 &&
                                <EmptyObjects message={"No hay productos que mostrar"}
                                              withButtonText={"Explorar productos"}
                                              withButton={"/products"}
                                />
                            }
                            {data.taxonByPermalink.products.nodes.map((product, i) => (
                                <ProductsItem product={product} key={i}/>
                            ))}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}