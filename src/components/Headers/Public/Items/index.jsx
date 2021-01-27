import {header} from "../../../../../public/static/locales/es/common.json";
import Link from "next/link";
import {useRouter} from "next/router";
import {SITE_COLORS} from "../../../../site/info";

export default function HeaderItems() {
    const router = useRouter();
    console.log(router.asPath)
    return (
        <div className="w-full space-x-6">
            {
                header.items.map((item, i) => (
                    <Link href={item.href} key={i}>
                        <a title={item.title}
                           className={`uppercase pb-1 text-center hover:border-b text-xs font-medium hover:${SITE_COLORS.text} ${router.asPath === item.href ? `${SITE_COLORS.text} border-b` : `${SITE_COLORS.text_light}`} ${SITE_COLORS.border}`}>{item.title}</a>
                    </Link>
                ))
            }
        </div>
    )
}