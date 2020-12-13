export default function ProductLoadingData() {
    return (
        <div className="w-full">
            <div className="w-full">
                <h1 className="font-medium text-5xl text-gray-200 bg-gray-200 select-none w-full animate-pulse rounded">.</h1>
                <h2 className="font-medium text-xl mt-4 mb-6 select-none w-40 animate-pulse rounded bg-gray-200 text-gray-200">.</h2>
                <div className="w-full mb-6">
                    <div className="w-full space-y-4">
                        <div className="w-full flex flex-wrap">
                            <p className="mb-2">
                                            <span
                                                className="w-full bg-gray-200 text-gray-200 select-none rounded animate-pulse">Color demo</span>
                            </p>
                            <div className="w-full flex space-x-4">
                                <div
                                    className={`w-auto py-1 px-6 mb-3 bg-gray-200 text-gray-200 select-none rounded animate-pulse`}>
                                    Demo de variante
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-wrap">
                            <p className="mb-2">
                                            <span
                                                className="w-full bg-gray-200 text-gray-200 select-none rounded animate-pulse">Color demo</span>
                            </p>
                            <div className="w-full flex space-x-4">
                                <div
                                    className={`w-auto py-1 px-6 mb-3 bg-gray-200 text-gray-200 select-none rounded animate-pulse`}>
                                    Demo de variante
                                </div>
                                <div
                                    className={`w-auto py-1 px-6 mb-3 bg-gray-200 text-gray-200 select-none rounded animate-pulse`}>
                                    Demo de variante
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-4">
                    <div className="w-full flex items-center mb-3 space-x-4">
                        <div className="w-4/12 bg-gray-200 text-gray-200 select-none animate-pulse rounded">.</div>
                        <div className="py-3 w-8/12 bg-gray-200 text-gray-200 select-none animate-pulse rounded">.</div>
                    </div>
                    <div className="py-3 w-full bg-gray-200 text-gray-200 select-none animate-pulse rounded">.</div>
                </div>
            </div>
        </div>
    )
}