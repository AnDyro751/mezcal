import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";
import {SITE_SOCIAL, SITE_USERNAME} from "../../site/info";

export default function Footer() {
    return (
        <div className="w-full bg-white border-t border-gray-50">
            <div className="w-11/12 mx-auto p-4 flex space-x-4">
                <div className="w-4/12">
                    <ul className="space-y-4 text-sm text-gray-700">
                        <li className="w-full text-gray-900 text-xl font-medium">General</li>
                        <li className="hover:underline cursor-pointer">Inicio de la página</li>
                        <li className="hover:underline cursor-pointer">Contacto</li>
                        <li className="hover:underline cursor-pointer">Ventas al mayoreo</li>
                    </ul>
                </div>
                <div className="w-4/12 flex justify-center">
                    <ul className="space-y-4 text-sm text-gray-700">
                        <li className="w-full text-gray-900 text-xl font-medium">Social</li>
                        <li className="hover:underline cursor-pointer">
                            <div className="w-full flex items-center space-x-2">
                                <FaFacebook className="fill-current text-black text-lg"/>
                                <a
                                    rel="noreferrer"
                                    target={"_blank"}
                                    href={SITE_SOCIAL["facebook"]}
                                >
                                    <span className="text-gray-700">/{SITE_USERNAME["facebook"]}</span>
                                </a>
                            </div>
                        </li>
                        <li className="hover:underline cursor-pointer">
                            <div className="w-full flex items-center space-x-2">
                                <FaInstagram className="fill-current text-black text-lg"/>
                                <a
                                    rel="noreferrer"
                                    target={"_blank"}
                                    href={SITE_SOCIAL["instagram"]}
                                >
                                    <span className="text-gray-700">{SITE_USERNAME["instagram"]}</span>
                                </a>
                            </div>
                        </li>
                        <li className="hover:underline cursor-pointer">
                            <div className="w-full flex items-center space-x-2">
                                <FaTwitter className="fill-current text-black text-lg"/>
                                <a
                                    rel="noreferrer"
                                    target={"_blank"}
                                    href={SITE_SOCIAL["twitter"]}
                                >
                                    <span className="text-gray-700">{SITE_USERNAME["twitter"]}</span>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="w-4/12 flex justify-end">
                    <ul className="space-y-4 text-sm text-gray-700">
                        <li className="hover:underline cursor-pointer">Footer item</li>
                        <li className="hover:underline cursor-pointer">Footer item</li>
                        <li className="hover:underline cursor-pointer">Footer item</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}