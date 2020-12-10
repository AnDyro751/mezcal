import runQuery from "../src/graphql/queries/runQuery";
import {SHOW_PRODUCT_QUERY} from "../src/graphql/queries/pages/products/show";
import LayoutApplication from "../src/components/Layout/application";
import {MAIN_QUERY} from "../src/graphql/queries/main";
import SHOW_PRODUCTS_QUERY from "../src/graphql/queries/pages/products";

const PageProducts = ({data}) => {
    if (!data) {
        return (
            <LayoutApplication
                seo={{title: "Producto"}}>
                <h1>Ha ocurrido un error</h1>
            </LayoutApplication>
        )
    }
    return (
        <LayoutApplication
            currentOrder={data.currentOrder}
            seo={{title: "Producto"}}
        >
            <div className="w-full">
                <h2>Hola</h2>
            </div>
        </LayoutApplication>
    )

}

export async function getServerSideProps() {
    const data = await runQuery(MAIN_QUERY(SHOW_PRODUCTS_QUERY, null));
    return {
        props: {
            data: data
        }
    }
}

export default PageProducts