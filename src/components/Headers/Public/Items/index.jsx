import {header} from "../../../../../public/static/locales/es/common.json";
import Link from "next/link";
import {useRouter} from "next/router";

export default function HeaderItems() {
    const router = useRouter();
    console.log(router.asPath)
    return (
        <div className="w-full space-x-6">
            {
                header.items.map((item, i) => (
                    <Link href={item.href} key={i}>
                        <a title={item.title}
                           className={`uppercase text-center text-xs font-medium hover:text-black ${router.asPath === item.href ? "text-black" : "text-gray-800"}`}>{item.title}</a>
                    </Link>
                ))
            }
        </div>
    )
}