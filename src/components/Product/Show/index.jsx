import ProductGallery from "../gallery";
import ProductData from "../data";
import {useQuery, gql} from "@apollo/client";
import {SHOW_PRODUCT_QUERY} from "../../../graphql/queries/pages/products/show";
import ProductLoadingGallery from "../Loading/ProductLoadingGallery";
import ProductLoadingData from "../Loading/ProductLoadingData";
import dynamic from 'next/dynamic'
import updateLazyLoad from "../../../lib/updateLazyLoad";
import {useEffect} from 'react';
import {useRouter} from 'next/router'

const PagesError = dynamic(() => import('../../../pages/error'), {
    ssr: false
})
const ProductReviews = dynamic(() => import('../Reviews'), {
    ssr: false
})

function ComponentsProductShow() {
    const router = useRouter();
    const {data: mainData, loading, error} = useQuery(gql`${SHOW_PRODUCT_QUERY(router.query.slug)}`, {
        // onCompleted: (newData) => {
        //     console.log(newData, "NEWDATA");
        // }
    })
    const variant = router.query.variant || null;
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
            <div className="w-11/12 mx-auto justify-between flex space-x-0 md:space-x-12 pt-8 md:pt-10 items-start flex-wrap lg:flex-nowrap space-y-8 md:space-y-0">
                <div className="w-full lg:w-6/12">
                    {
                        loading ?
                            <ProductLoadingGallery/>
                            :
                            <ProductGallery product={mainData.productBySlug}/>
                    }
                </div>
                <div className="w-full lg:w-6/12 p-6 bg-gray-100">
                    {loading ?
                        <ProductLoadingData/>
                        :
                        <ProductData product={mainData.productBySlug} variant={variant}/>
                    }
                </div>

            </div>
            <div className="w-11/12 flex mx-auto">
                {!loading &&
                <ProductReviews product={mainData.productBySlug}/>
                }
            </div>
        </>
    )
}

// export default withApollo({ssr: true})(ComponentsProductShow);
export default ComponentsProductShow