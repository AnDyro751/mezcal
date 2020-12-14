import ProductsItem from "../Item";
import {gql, useQuery} from "@apollo/client";
import SHOW_PRODUCTS_QUERY from "../../../graphql/queries/pages/products";
import withApollo from "../../../lib/apollo";

function ProductsListProducts({}) {
    const {data, loading, error} = useQuery(gql`${SHOW_PRODUCTS_QUERY}`, {
        variables: {
            first: 20,
        },
        ssr: true
    });
    if (loading) {
        return (
            <h2>Cargando productos</h2>
        )
    }
    if (error) {
        return (
            <h2>Error{error.toLocaleString()}</h2>
        )
    }
    return (
        <div className="w-full flex justify-center mt-10">
            <div className="w-10/12 flex space-x-4">
                {data.products.edges.map((product, i) => (
                    <div className="w-3/12"
                         key={i}
                    >
                        <ProductsItem
                            product={product.node}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default withApollo({ssrc: true})(ProductsListProducts)
