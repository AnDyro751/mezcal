import ProductGallery from "../gallery";
import ProductData from "../data";
import withApollo from "../../../lib/apollo";
import {useQuery, gql} from "@apollo/client";
import {SHOW_PRODUCT_QUERY} from "../../../graphql/queries/pages/products/show";
import {useRouter} from "next/router";

function ComponentsProductShow({product = {}}) {
    const router = useRouter()
    const {data: mainData, loading, error} = useQuery(gql`${SHOW_PRODUCT_QUERY(router.query.slug)}`, {})
    if (loading) {
        return (
            <h1>Cargando producto</h1>
        )
    }
    return (
        <div className="w-10/12 mx-auto flex space-x-4">
            <div className="w-7/12">
                <ProductGallery product={mainData.productBySlug}/>
            </div>
            <div className="w-5/12">
                <ProductData product={mainData.productBySlug}/>
            </div>
        </div>
    )
}

export default withApollo({ssr: true})(ComponentsProductShow);