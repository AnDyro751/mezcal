import {header} from "../../../../../public/static/locales/es/common.json";
import Link from "next/link";
import {useRouter} from "next/router";

export default function HeaderItems() {
    const router = useRouter();
    console.log(router.asPath)
    return (
        <div className="w-full space-x-4">
            {
                header.items.map((item, i) => (
                    <Link href={item.href} key={i}>
                        <a className={`uppercase text-center text-sm font-medium hover:text-black ${router.asPath === item.href ? "text-black" : "text-gray-500"}`}>{item.title}</a>
                    </Link>
                ))
            }
        </div>
    )
}