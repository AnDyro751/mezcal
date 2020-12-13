import Link from 'next/link'

export default function ProductTaxons({product}) {
    if (product.taxons.nodes.length <= 0) {
        return null
    }
    return (
        <div className="w-full mt-4">
            <p>Categorías:&#160;&#160;
                {product.taxons.nodes.map((taxon, i) => (
                    <>
                        <Link href={`/t/${taxon.permalink}`}>
                            <a
                                className="text-xs text-gray-600 hover:underline">{taxon.name}</a>
                        </Link>
                        <span className="mr-1 text-xs text-gray-600">{(i + 1) === product.taxons.nodes.length ? "" : " , "}</span>
                    </>
                ))}
            </p>
        </div>
    )
}