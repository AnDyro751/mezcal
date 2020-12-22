import ProductGallery from "../gallery";
import ProductData from "../data";
import withApollo from "../../../lib/apollo";
import {useQuery, gql} from "@apollo/client";
import {SHOW_PRODUCT_QUERY} from "../../../graphql/queries/pages/products/show";
import ProductLoadingGallery from "../Loading/ProductLoadingGallery";
import ProductLoadingData from "../Loading/ProductLoadingData";
import dynamic from 'next/dynamic'
import updateLazyLoad from "../../../lib/updateLazyLoad";
import {useEffect} from 'react';

const PagesError = dynamic(() => import('../../../pages/error'), {
    ssr: false
})
const ProductReviews = dynamic(() => import('../Reviews'), {
    ssr: false
})

function ComponentsProductShow({slug = "", variant = null}) {
    const {data: mainData, loading, error} = useQuery(gql`${SHOW_PRODUCT_QUERY(slug)}`)
    useEffect(() => {
        if (mainData) {
            updateLazyLoad();
        }
    }, [mainData])
    if (!loading) {
        if (error) {
            return (
                <PagesError message={"Ha ocurrido un error"}/>
            )
        }
        if (!mainData.productBySlug) {
            return (
                <PagesError message={"Ha ocurrido un error"}/>
            )
        }

    }
    return (
        <>
            <div className="w-10/12 mx-auto flex space-x-6 mt-10">
                <div className="w-7/12">
                    {
                        loading ?
                            <ProductLoadingGallery/>
                            :
                            <ProductGallery product={mainData.productBySlug}/>
                    }
                </div>
                <div className="w-5/12">
                    {loading ?
                        <ProductLoadingData/>
                        :
                        <ProductData product={mainData.productBySlug} variant={variant}/>
                    }
                </div>

            </div>
            <div className="w-10/12 flex mx-auto">
                {!loading &&
                <ProductReviews product={mainData.productBySlug}/>
                }
            </div>
        </>
    )
}

export default withApollo({ssr: true})(ComponentsProductShow);