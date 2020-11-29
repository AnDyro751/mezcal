import Link from "next/link";

export default function HeadersPublic() {
    return (
        <header className="w-full">
            <div className="grid grid-cols-3">
                <div className="col-span-2 grid grid-cols-2">
                    <div className="col-span-1">
                        <Link href={"/"}>
                            <a>Mezcal</a>
                        </Link>
                    </div>
                </div>
                <div className="col-span-1">
                    <Link href={"/products/125"}>
                        <a>Producto</a>
                    </Link>
                </div>
            </div>
        </header>
    )
}