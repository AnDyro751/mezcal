import LayoutApplication from "../src/components/Layout/application";
import {useQuery} from "@apollo/client";
import INDEX_PAGE_QUERY from "../src/graphql/queries/pages";
import ComponentsPagesIndex from "../src/components/Pages/Index";

function Home() {
    const {data, loading, error} = useQuery(INDEX_PAGE_QUERY, {
        variables: {
            first: 15
        }
    });

    return (
        <LayoutApplication>
            {
                loading &&
                <h2>Cargando</h2>
            }
            {
                error &&
                <h2>Error</h2>
            }
            {
                data &&
                <ComponentsPagesIndex products={data.products.nodes} taxonomies={data.taxonomies}/>
            }
        </LayoutApplication>
    )
}

export default Home


