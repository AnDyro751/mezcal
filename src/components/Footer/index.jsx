import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";
import {SITE_COLORS, SITE_FOOTER_MENU, SITE_SOCIAL, SITE_TITLE, SITE_USERNAME} from "../../site/info";
import NewsLetterForm from "../NewsLetterForm";
import Link from 'next/link';

export default function Footer() {
    return (
        <div className={`w-full border-t py-12 mt-10 flex-wrap ${SITE_COLORS.bg} ${SITE_COLORS.border_light}`}>
            <div className="w-11/12 mx-auto flex md:space-x-0 md:space-y-0 space-y-8 lg:flex-nowrap flex-wrap">
                <div className="w-full md:w-6/12 lg:w-4/12">
                    <ul className={`space-y-4 w-full text-sm ${SITE_COLORS.text}`}>
                        <li className={`w-full text-xl font-medium ${SITE_COLORS.text}`}>General</li>
                        {SITE_FOOTER_MENU.map((item, i) => (
                            <li key={i}>
                                <Link href={item.href}>
                                    <a className="hover:underline">
                                        {item.title}
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full md:w-6/12 justify-center lg:w-4/12">
                    <ul className="space-y-4 w-full text-sm">
                        <li className={`w-full text-xl font-medium ${SITE_COLORS.text}`}>Social</li>
                        <li className="">
                            <div className="w-full flex items-center space-x-2">
                                <FaFacebook className={`fill-current text-lg ${SITE_COLORS.text}`}/>
                                <a
                                    className="hover:underline cursor-pointer"
                                    rel="noreferrer"
                                    target={"_blank"}
                                    href={SITE_SOCIAL["facebook"]}
                                >
                                    <span className={`${SITE_COLORS.text}`}>/{SITE_USERNAME["facebook"]}</span>
                                </a>
                            </div>
                        </li>
                        <li className="hover:underline cursor-pointer">
                            <div className="w-full flex items-center space-x-2">
                                <FaInstagram className={`fill-current text-lg ${SITE_COLORS.text}`}/>
                                <a
                                    className="hover:underline cursor-pointer"
                                    rel="noreferrer"
                                    target={"_blank"}
                                    href={SITE_SOCIAL["instagram"]}
                                >
                                    <span className={`${SITE_COLORS.text}`}>{SITE_USERNAME["instagram"]}</span>
                                </a>
                            </div>
                        </li>
                        <li className="hover:underline cursor-pointer">
                            <div className="w-full flex items-center space-x-2">
                                <FaTwitter className={`fill-current text-lg ${SITE_COLORS.text}`}/>
                                <a
                                    className="hover:underline cursor-pointer"
                                    rel="noreferrer"
                                    target={"_blank"}
                                    href={SITE_SOCIAL["twitter"]}
                                >
                                    <span className={`${SITE_COLORS.text}`}>{SITE_USERNAME["twitter"]}</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="w-full md:w-6/12 flex justify-end lg:w-4/12 md:pt-8 pt-0">
                    <ul className="space-y-4 w-full text-sm">
                        <li className={`w-full text-xl font-medium ${SITE_COLORS.text}`}>Boletín de noticias</li>
                        <NewsLetterForm/>
                    </ul>
                </div>
            </div>
            <div className="w-full text-center mt-16">
                <p className={`text-xs ${SITE_COLORS.text}`}>Todos los derechos reservados. Mezcal <span
                    className="font-medium">{SITE_TITLE}</span></p>
            </div>
        </div>
    )
}