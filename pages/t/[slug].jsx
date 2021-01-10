import LayoutApplication from "../../src/components/Layout/application";
import withApollo from "../../src/lib/apollo";
import ComponentsPageTaxonomy from "../../src/components/Pages/Taxonomy";
import {useQuery} from "@apollo/client";
import GET_TAXONOMY_BY_PERMALINK_QUERY from "../../src/graphql/queries/pages/taxonomy";
import {useRouter} from 'next/router'

function PagesTaxonomy() {
    const router = useRouter();

    const {data, loading, error} = useQuery(GET_TAXONOMY_BY_PERMALINK_QUERY, {
        variables: {
            permalink: router.query.slug
        }
    });
    return (
        <LayoutApplication>
            {
                loading &&
                <h2>Cargando...</h2>
            }
            {
                error &&
                <h2>Error</h2>
            }
            {
                data &&
                <ComponentsPageTaxonomy taxonomies={data.taxonomies} taxon={data.taxonByPermalink}/>
            }
        </LayoutApplication>
    )
}

export default withApollo({ssr: true})(PagesTaxonomy);