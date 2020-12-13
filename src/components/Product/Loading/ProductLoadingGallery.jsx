export default function ProductLoadingGallery() {
    return (
        <div className="w-full flex flex-wrap">
            <div className="w-full bg-gray-200 animate-pulse h-96 cursor-wait"/>
            <div className="w-full">
                <div className="flex space-x-4 mt-4">
                    <div className="w-36 h-24 bg-gray-200 animate-pulse cursor-wait"/>
                    <div className="w-36 h-24 bg-gray-200 animate-pulse cursor-wait"/>
                    <div className="w-36 h-24 bg-gray-200 animate-pulse cursor-wait"/>
                </div>
            </div>
        </div>
    )
}