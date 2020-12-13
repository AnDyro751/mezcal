import LayoutApplication from "../src/components/Layout/application";
import ProductsListProducts from "../src/components/Products/ListProducts";
import runQuery from "../src/graphql/queries/runQuery";
import {MAIN_QUERY} from "../src/graphql/queries/main";

const PageProducts = ({data}) => {

    const {currentOrder} = data;
    return (
        <LayoutApplication
            currentOrder={currentOrder}
            seo={{title: "Producto"}}
        >
            <ProductsListProducts/>
        </LayoutApplication>
    )

}

export async function getServerSideProps({query, res}) {
    const data = await runQuery(MAIN_QUERY());
    return {
        props: {
            data: data
        }
    }
}

export default PageProducts