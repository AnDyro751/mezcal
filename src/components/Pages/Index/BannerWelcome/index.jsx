import GetImageUrl, {generateUrlPath} from "../../../../lib/getImageUrl";
import Cards from "./Cards";

export default function BannerWelcome({}) {
    return (
        <div className="w-full">
            <div className="w-full">
                <div className="h-80 lg:h-screen bg-black relative bg-opacity-50 lg:max-h-screen overflow-hidden">
                    <div
                        style={{
                            backgroundImage: `url(${GetImageUrl({
                                publicId: "mezcal/1t6gbas612.jpg",
                                height: 700,
                                width: 1000,
                                fit: "cover"
                            })})`
                        }}
                        className="w-full h-full bg-cover bg-no-repeat bg-center z-10"
                    />
                    <div
                        className="w-full absolute h-80 lg:h-screen bg-black z-20 items-center content-center bg-opacity-60 top-0 bottom-0 left-0 right-0 flex justify-center">
                        <div className="w-full text-center z-40 mt-12 md:mt-0">
                            <h4 className="uppercase text-base md:text-2xl mb-4 md:mb-8 text-white">#MEDIANOCHE</h4>
                            <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl text-white">Lorem ipsum dolor sit
                                amet</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full -mt-10 md:-mt-16 z-40 relative mx-auto mb-12">
                <div
                    className="w-11/12 mx-auto flex lg:space-x-12 space-y-8 lg:space-y-0 flex flex-wrap lg:flex-nowrap">
                    <div className="w-full lg:w-4/12">
                        <Cards
                            srcset={`${GetImageUrl({
                                publicId: "mezcal/DgKg58jWsAAoYoO.jpg",
                                height: 400,
                                width: 300,
                                fit: "cover"
                            })} 400w, ${GetImageUrl({
                                publicId: "mezcal/DgKg58jWsAAoYoO.jpg",
                                height: 800,
                                width: 700,
                                fit: "cover"
                            })} 720w, ${GetImageUrl({
                                publicId: "mezcal/DgKg58jWsAAoYoO.jpg",
                                height: 800,
                                width: 700,
                                fit: "cover"
                            })} 900w,
                               ${GetImageUrl({
                                publicId: "mezcal/DgKg58jWsAAoYoO.jpg",
                                height: 1000,
                                width: 700,
                                fit: "cover",
                            })} 1512w
                               `}
                            imgUrl={GetImageUrl({
                                publicId: "mezcal/DgKg58jWsAAoYoO.jpg",
                                height: 600,
                                width: 400,
                                fit: "cover"
                            })}
                        />
                    </div>
                    <div className="w-full lg:w-4/12">
                        {/*//cdn.shopify.com/s/files/1/0261/1973/3329/products/tobala03-w2_360x.jpg?v=1592351243 360w, //cdn.shopify.com/s/files/1/0261/1973/3329/products/tobala03-w2_540x.jpg?v=1592351243 540w, //cdn.shopify.com/s/files/1/0261/1973/3329/products/tobala03-w2_720x.jpg?v=1592351243 720w, //cdn.shopify.com/s/files/1/0261/1973/3329/products/tobala03-w2_900x.jpg?v=1592351243 900w*/}
                        <Cards big={true}
                               srcset={`${GetImageUrl({
                                   publicId: "mezcal/BM-2-Llega-a-Nueva-York-mezcal-hecho-por-mujeres-de-Oaxaca.jpg",
                                   height: 400,
                                   width: 300,
                                   fit: "cover"
                               })} 400w, ${GetImageUrl({
                                   publicId: "mezcal/BM-2-Llega-a-Nueva-York-mezcal-hecho-por-mujeres-de-Oaxaca.jpg",
                                   height: 800,
                                   width: 700,
                                   fit: "cover"
                               })} 720w, ${GetImageUrl({
                                   publicId: "mezcal/BM-2-Llega-a-Nueva-York-mezcal-hecho-por-mujeres-de-Oaxaca.jpg",
                                   height: 800,
                                   width: 700,
                                   fit: "cover"
                               })} 900w,
                               ${GetImageUrl({
                                   publicId: "mezcal/BM-2-Llega-a-Nueva-York-mezcal-hecho-por-mujeres-de-Oaxaca.jpg",
                                   height: 1000,
                                   width: 700,
                                   fit: "cover",
                               })} 1512w
                               `}
                               imgUrl={GetImageUrl({
                                   publicId: "mezcal/BM-2-Llega-a-Nueva-York-mezcal-hecho-por-mujeres-de-Oaxaca.jpg",
                                   height: 600,
                                   width: 400,
                                   fit: "cover",
                               })}
                        />
                    </div>
                    <div className="w-full lg:w-4/12">
                        <Cards
                            srcset={`${GetImageUrl({
                                publicId: "mezcal/mezcal.jpg",
                                height: 400,
                                width: 300,
                                fit: "cover"
                            })} 400w, ${GetImageUrl({
                                publicId: "mezcal/mezcal.jpg",
                                height: 800,
                                width: 700,
                                fit: "cover"
                            })} 720w, ${GetImageUrl({
                                publicId: "mezcal/mezcal.jpg",
                                height: 800,
                                width: 700,
                                fit: "cover"
                            })} 900w,
                               ${GetImageUrl({
                                publicId: "mezcal/mezcal.jpg",
                                height: 1000,
                                width: 700,
                                fit: "cover",
                            })} 1512w
                               `}
                            imgUrl={GetImageUrl({
                                publicId: "mezcal/mezcal.jpg",
                                height: 600,
                                width: 400,
                                fit: "cover",
                            })}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}