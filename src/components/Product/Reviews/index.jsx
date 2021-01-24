import {useInView} from 'react-intersection-observer';
import {useEffect, useState} from "react";
import GET_PRODUCT_REVIEWS from "../../../graphql/queries/pages/products/reviews";
import runQuery from "../../../graphql/queries/runQuery";
import NewReview from "../../Reviews/NewReview";
import ReactStars from "react-rating-stars-component";

export default function ProductReviews({product = {}}) {
    const {ref, inView, entry} = useInView({
        rootMargin: "25px 0px",
    });
    const [allReviews, setAllReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [openNewReview, setOpenNewReview] = useState(false);

    useEffect(() => {
        if (inView) {
            const getReviews = async () => {
                try {
                    const data = await runQuery(GET_PRODUCT_REVIEWS, {
                        slug: product.slug
                    }, "cache-first");
                    setLoaded(true);
                    console.log(data, "DATA")
                    setAllReviews(data.productBySlug.reviews.nodes || []);
                } catch (e) {
                    console.log("Ha ocurrido un error");
                }
            }
            if (!loaded) {
                getReviews();
            }
        }
    }, [inView])
    return (
        <div className="w-full mt-10" ref={ref}>
            <h3 className="text-4xl text-center text-gray-800 font-medium">
                Reseñas
            </h3>
            <div className="w-full flex mt-8 items-center pb-6 border-b border-gray-400">
                <div className="w-6/12">
                    <div className="text-sm text-gray-800 flex items-center space-x-4">
                        <div className="flex space-x-3 items-center">
                            <span className="font-medium text-gray-800">({product.avgRating})</span>
                        </div>
                        <span className="h-4">
                                        Basado en {product.reviewsCount} reseñas
                        </span>
                    </div>
                </div>
                <div className="w-6/12 justify-end flex">
                    <h4
                        onClick={() => {
                            setOpenNewReview(!openNewReview)
                        }}
                        className="text-sm text-gray-800 underline cursor-pointer">
                        Escribir reseña
                    </h4>
                </div>
            </div>


            {
                openNewReview &&
                <div className="w-full mt-4">
                    <NewReview
                        handleClose={(e) => {
                            setOpenNewReview(e)
                        }}
                        open={openNewReview} product={product}/>
                </div>
            }
            <div className="w-full divide-y divide-gray-400">
                {
                    !loading &&
                    allReviews.map((review, i) => (
                        <div key={i} className="w-full flex flex-wrap py-6">
                            <div className="w-full">
                                <ReactStars
                                    className="flex w-full space-x-2"
                                    edit={false}
                                    value={review.rating}
                                    count={5}
                                    filledIcon={<img alt="svgImg"
                                                     className="h-6"
                                                     src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjYiIGhlaWdodD0iMjYiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgaWQ9Im9yaWdpbmFsLWljb24iIGZpbGw9IiNmMWM0MGYiPjxwYXRoIGQ9Ik0xNjcuNTI5NDUsNjcuMDU4MjljLTAuNzQ5NCwtMi4zNzc0IC0yLjg0MjU1LC00LjEzNDYyIC01LjMyMzMyLC00LjQ5NjRsLTQ4LjU1NTg4LC03LjA1NDY5bC0yMS43MzI1OCwtNDQuMDA3ODFjLTIuMjIyMzUsLTQuNDk2MzkgLTkuNjEyOTgsLTQuNDk2MzkgLTExLjg2MTE3LDBsLTIxLjcwNjczLDQ0LjAwNzgxbC00OC41NTU4OSw3LjA1NDY5Yy0yLjQ4MDc3LDAuMzYxNzggLTQuNTczOTIsMi4wOTMxNSAtNS4zNDkxNiw0LjQ5NjRjLTAuNzc1MjQsMi40MDMyNCAtMC4xMjkyMSw1LjAzOTA2IDEuNjc5NjksNi43NzA0M2wzNS4xNDQyMywzNC4yNjU2M2wtOC4yOTUwNyw0OC4zNDkxNmMtMC40MTM0NiwyLjQ4MDc3IDAuNTk0MzUsNS4wMTMyMiAyLjYzNTgyLDYuNDg2MTdjMi4wNDE0NiwxLjQ3Mjk2IDQuNzI4OTYsMS42Nzk2OSA2Ljk1MTMyLDAuNDkwOTlsNDMuNDM5MywtMjIuODE3OTFsNDMuNDEzNDYsMjIuODE3OTFjMC45ODE5NywwLjUxNjgzIDIuMDQxNDcsMC43NDk0IDMuMTAwOTYsMC43NDk0YzEuMzY5NTksMCAyLjcxMzM0LC0wLjQxMzQ2IDMuODc2MjEsLTEuMjQwMzhjMi4wNDE0NiwtMS40OTg3OSAzLjA0OTI4LC00LjAwNTQgMi42MzU4MSwtNi40ODYxN2wtOC4yOTUwNywtNDguMzQ5MTZsMzUuMTQ0MjMsLTM0LjI2NTYzYzEuODA4ODksLTEuNzU3MjEgMi40MjkwOCwtNC4zNjcxOSAxLjY1Mzg1LC02Ljc3MDQzeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"/>}
                                    emptyIcon={<img
                                        className="h-6"
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAAB10lEQVRIic3WwYtNcRQH8M+8odhgMRZsvGIkL1loFmjqEZqFP8Ha2h/wBktLu4kVIaKmKQuhKGVBmc3MbKiJBbGQoTdMGq7FPc+9bu9xL++VU6ff7fy+3/M959f5/br8x3YhfKB2DEn40UEKPcoJPR6UyKEQeB+eRKzv9jCStzAZ3w/6LXIgEn/AJmyQdTXeT6F7kXQyFzsdsbtlEgx1idWwDaPYiT04iSXU8TFwG/FS2uFFzOE5XuAVvhcTr8dZTGMeK7LJynurS1GtHtiVyDWNM1g3hAncKSR4E9V1fAH38a2AG5bep0Z03/GtBdwErMVMrpJml8qrWlN2MjOh8bOya7GxhP3/ILJPNpG38iJ5sSsBaPu7y3hQOiwJbnYTyYtdDuAyDlcQGcen4N7Amj8RimI7SoiMBjYJ7nDZ6mpYDGKZ4WgGdjG4pa2Gz0HeXAI/EtgvKnRDelwJ3lbgvAvO9m6bvdrcHetCIT6G2+Fjhb35WBtVhDrguVh3Scf1CY6HP5W+FnvLCPUawU5Hy7iEE9Kzb+N87J3CETzDVbwucEvZrF8fya/SH5ItOcwIzkkHII+drSLUDtJqdFT/DbYemFXZq1LapnBdj/PuYY3gTFUR6rv9AAJSiX9ESl3rAAAAAElFTkSuQmCC"/>}
                                />
                            </div>
                            <div className="w-full mt-3">
                                <div className="w-full flex space-x-4 items-center">
                                    <div className="w-8/12">
                                        <p className="uppercase truncate font-bold mb-1">{review.title}</p>
                                        <span className="text-xs text-gray-500">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <p className="leading-tight text-gray-700 mt-2">{review.review}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}