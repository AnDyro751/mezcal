import decryptId from "./decryptId";

const GetImageUrl = ({publicId = "", width = 500, height = 500, fit = "outside", bgColor = null}) => {
    let options = JSON.stringify({
        "bucket": "waydda-qr",
        "key": publicId,
        "edits": {
            "resize": {
                "width": width || height,
                "height": height || width,
                "fit": fit,
                background: {
                    "r": 255,
                    "g": 255,
                    "b": 255,
                    "alpha": 1
                }
            }
        }
    })
    return `https://d1nrrr6y3ujrjz.cloudfront.net/${Buffer.from(options).toString('base64')}`
}
export const generateUrlPath = ({id = null, filename = null}) => {
    return `${decryptId(id)}/large/${filename}`
};
// export generateUrlPath;
export default GetImageUrl