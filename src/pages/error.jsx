import {LazyLoadImage} from "react-lazy-load-image-component";
import GetImageUrl, {generateUrlPath} from "../lib/getImageUrl";

const PagesError = ({message = "", big = false}) => {
    return (
        <>
            <div className="w-full flex justify-center mt-16">
                <LazyLoadImage
                    draggable={false}
                    placeholderSrc={`${GetImageUrl({
                        publicId: "utils/fatal-error-4.png",
                        height: 10,
                        width: 10
                    })}`}
                    alt={"Error image"}
                    src={`${GetImageUrl({
                        publicId: "utils/fatal-error-4.png",
                        height: 400,
                        width: 400
                    })}`}
                />
            </div>
            <div className="w-full flex justify-center mt-12" >
                <h2 className="text-4xl font-medium">{message}</h2>
            </div>
        </>
    )
}

export default PagesError