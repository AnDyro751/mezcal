import Link from "next/link";
import {useContext, useEffect, useState} from 'react'
import {OrderContext} from "../../../stores/userOrder";
import {SITE_COLORS, SITE_TITLE} from "../../../site/info";
import HeaderItems from "./Items";
import {FiMenu} from 'react-icons/fi';
import {FaShoppingCart} from "react-icons/fa";
import MainPromotion from "../../MainPromotion";

export default function HeadersPublic({transparent = true}) {
    const {state} = useContext(OrderContext);
    const [activeHeader, setActiveHeader] = useState(false);

    const {order} = state;

    useEffect(() => {
        if (transparent) {
            document.addEventListener("scroll", handleListener);
        }
        return () => {
            document.removeEventListener("scroll", handleListener);
        }
    }, [])

    const handleListener = () => {
        if (window.scrollY > 150) {
            setActiveHeader(true);
        } else {
            setActiveHeader(false);
        }
    };

    return (
        <>
            <div
                className={`w-full flex flex-wrap fixed top-0 left-0 right-0 justify-center z-50 ${activeHeader ? "bg-black" : "bg-black bg-opacity-20"}`}>
                <MainPromotion/>
                <div className="w-11/12 flex items-center py-5">
                    <div className="grid grid-cols-12 md:col-span-8 items-center w-full">
                        <div className="md:col-span-4 hidden md:block">
                            <HeaderItems/>
                        </div>
                        <div className="col-span-2 p-1 cursor-pointer visible md:hidden">
                            <FiMenu className={`h-6 w-6 text-white`}/>
                        </div>
                        <div className="col-span-8 md:col-span-4 flex justify-center">
                            <Link href={"/"}>
                                <a className={`text-2xl md:text-4xl font-medium main-title text-white`}>{SITE_TITLE}</a>
                            </Link>
                        </div>
                        <div className="col-span-2 md:col-span-4 flex justify-end">
                            <Link href={"/cart"}>
                                <a className={`text-center flex items-center justify-center text-white`}>
                                    <FaShoppingCart className={`fill-current text-white mr-2`}/>
                                    {/*<img*/}
                                    {/*    alt="Shopping cart icon"*/}
                                    {/*    className="inline mr-3"*/}
                                    {/*    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBkPSJNIDMuNSA2IEEgMS41MDAxNSAxLjUwMDE1IDAgMSAwIDMuNSA5IEwgNi4yNTU4NTk0IDkgQyA2Ljk4Mzc5MjMgOSA3LjU5MDU4NjUgOS41MDI5MjQzIDcuNzI4NTE1NiAxMC4yMTg3NSBMIDguMDI3MzQzOCAxMS43ODEyNSBMIDExLjI1MTk1MyAyOC43MTY3OTcgQyAxMS44MzUwNjggMzEuNzcyMzIxIDE0LjUyNzEzNSAzNCAxNy42Mzg2NzIgMzQgTCAzNi4zNjEzMjggMzQgQyAzOS40NzI4NjUgMzQgNDIuMTY2MDY0IDMxLjc3MzE3NyA0Mi43NDgwNDcgMjguNzE2Nzk3IEwgNDUuOTcyNjU2IDExLjc4MTI1IEEgMS41MDAxNSAxLjUwMDE1IDAgMCAwIDQ0LjUgMTAgTCAxMC43NDAyMzQgMTAgTCAxMC42NzU3ODEgOS42NTgyMDMxIEMgMTAuMjcyNjU3IDcuNTQ1NTMyMSA4LjQwNjk3MDUgNiA2LjI1NTg1OTQgNiBMIDMuNSA2IHogTSAxMS4zMTI1IDEzIEwgNDIuNjg3NSAxMyBMIDM5LjgwMDc4MSAyOC4xNTYyNSBDIDM5LjQ4NDc2NCAyOS44MTU4NyAzOC4wNTE3OTEgMzEgMzYuMzYxMzI4IDMxIEwgMTcuNjM4NjcyIDMxIEMgMTUuOTQ4ODA4IDMxIDE0LjUxNjc4MSAyOS44MTU4IDE0LjE5OTIxOSAyOC4xNTYyNSBMIDE0LjE5OTIxOSAyOC4xNTQyOTcgTCAxMS4zMTI1IDEzIHogTSAyMCAzNiBBIDMgMyAwIDAgMCAyMCA0MiBBIDMgMyAwIDAgMCAyMCAzNiB6IE0gMzQgMzYgQSAzIDMgMCAwIDAgMzQgNDIgQSAzIDMgMCAwIDAgMzQgMzYgeiI+PC9wYXRoPjwvc3ZnPg=="*/}
                                    {/*/>*/}
                                    <span className="text-sm">({order.itemCount || 0})</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}