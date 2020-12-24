import LayoutApplication from "../src/components/Layout/application";
import ProductsListProducts from "../src/components/Products/ListProducts";
import runQuery from "../src/graphql/queries/runQuery";
import {MAIN_QUERY} from "../src/graphql/queries/main";
import PagesError from "../src/pages/error";
import withApollo from '../src/lib/apollo'
import {useQuery, gql} from "@apollo/client";

const PageProducts = () => {
    // const {data, error, loading} = useQuery(gql`${MAIN_QUERY()}`);
    // if (loading) {
    //     return <h2>Cargando...</h2>
    // }
    // if (!data) {
    //     return <PagesError message={"Ha ocurrido un error"}/>
    // }

    // const {currentOrder} = data;

    return (
        <LayoutApplication
            currentOrder={{}}
            seo={{title: "Producto"}}
        >
            <ProductsListProducts/>
        </LayoutApplication>
    )

}

export default withApollo({ssr: true})(PageProducts)