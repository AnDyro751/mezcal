import LayoutApplication from "../src/components/Layout/application";
import ProductsListProducts from "../src/components/Products/ListProducts";
import withApollo from '../src/lib/apollo'

const PageProducts = () => {
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