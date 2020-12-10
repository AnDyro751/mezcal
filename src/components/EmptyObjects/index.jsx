import Link from 'next/link'

export default function EmptyObjects({message, withButton = null, withButtonText = "Ver más"}) {
    return (
        <div className="w-full flex flex-wrap">
            <div className="w-full flex justify-center">
                <h2 className="text-3xl font-medium">{message}</h2>
            </div>
            {withButton &&
            <div className="w-full mt-14 flex justify-center">
                <Link href={withButton}>
                    <a className="bg-black hover:opacity-75 py-3 px-8 rounded focus:outline-none text-white">
                        {withButtonText}
                    </a>
                </Link>
            </div>
            }
        </div>
    )
}