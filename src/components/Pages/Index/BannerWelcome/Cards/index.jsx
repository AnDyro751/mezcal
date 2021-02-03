// import GetImageUrl from "../../../../../lib/getImageUrl";

export default function Cards({big = false, imgUrl = "", srcset = ""}) {
    return (
        <div className={`w-full h-96 lg:h-xxl transform rounded relative ${big ? "lg:scale-105" : "lg:scale-95"}`}>
            <img src={imgUrl}
                 draggable={false}
                 className="lazy w-full h-full rounded"
                 alt=""
                 srcSet={srcset}
                 data-sizes="100w"
            />
            <div
                className="absolute w-full h-full rounded top-0 left-0 right-0 bg-black bg-opacity-70 flex justify-center items-center">
                <div className="text-center px-10 lg:px-8 space-y-8">
                    <h5 className="text-white font-medium lg:font-normal" >Lorem ipsum</h5>
                    <h4 className="text-3xl text-white font-bold uppercase">Lorem ipsum dolor</h4>
                    <button
                        className="bg-red-500 rounded font-medium text-white px-8 py-3 hover:bg-red-400 transition duration-150">Conoce
                        más
                    </button>
                </div>
            </div>
        </div>
    )
}