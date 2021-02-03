// import {LazyLoadImage} from "react-lazy-load-image-component";

export default function BannerThree({items = []}) {
    return (
        <div className="w-full flex lg:space-x-4 space-y-10 lg:space-y-0 py-6 flex-wrap lg:flex-nowrap">
            {
                items.map((item, i) => (
                    <div
                        key={i}
                        className="w-full lg:w-1/3 flex space-x-6 items-center"
                    >
                        <div className="w-16 h-16 select-none">
                            <img
                                draggable={false}
                                src={item.src} alt={item.alt}
                                 className="w-16 h-16 max-h-16 max-w-16 items-center flex justify-center rounded"/>
                        </div>
                        <div className="w-full space-y-2">
                            <div className="w-full">
                                <p className="font-medium text-2xl text-gray-900">{item.title}</p>
                            </div>
                            <div className="w-full">
                                <p className="text-gray-600 font-normal">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}