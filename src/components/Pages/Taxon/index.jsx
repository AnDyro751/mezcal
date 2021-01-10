import BreadCrumbs from "../../Breadcrumbs";
import {useRouter} from 'next/router'
import {useQuery} from "@apollo/client";
import GET_TAXONOMY_BY_PERMALINK_QUERY from "../../../graphql/queries/pages/taxonomy";
import ComponentsListTaxons from "../../ListTaxons";

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
                            ]
                        }
                        />
                    </div>
                    <div className="w-full">
                        <div className="w-3/12">
                            <ComponentsListTaxons taxonomies={data.taxonomies}/>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}