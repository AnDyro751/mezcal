import Link from 'next/link';

export default function ComponentsTaxon({taxonomy}) {
    return (
        <div className="w-full">
            <h3 className="uppercase font-medium mb-2 text-gray-800">Comprar por {taxonomy.name}</h3>
            <ul className="w-full space-y-1">
                {taxonomy.rootTaxon.children.nodes.map((taxon, i) => (
                    <li className="w-full" key={i}>
                        <Link href={`/t/${taxon.permalink}`}>
                            <a className="text-sm text-blue-600 font-normal hover:text-blue-800 hover:underline">{taxon.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="w-full mt-3">
                <Link href={`/t/${taxonomy.rootTaxon.permalink}`}>
                    <a className="text-sm text-gray-700 font-normal hover:text-gray-800 hover:underline">Ver todo</a>
                </Link>
            </div>
        </div>
    )
}