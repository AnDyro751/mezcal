import Link from 'next/link';

export default function BreadCrumbs({options = []}) {
    if (options.length <= 0) {
        return null;
    }
    return (
        <div className="w-full flex">
            {options.map((element, i) => (
                <div className="w-auto" key={i}>
                    <Link href={element.href ? element.href : "/"}>
                        <a className="text-blue-500 uppercase text-sm font-medium">{element.title}
                            {(i + 1) < (options.length) &&
                            <span className="text-black mx-2">»</span>
                            }
                        </a>
                    </Link>
                </div>
            ))}
        </div>
    )
}