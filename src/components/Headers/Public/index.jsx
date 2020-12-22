import Link from "next/link";
import {useContext} from 'react'
import {OrderContext} from "../../../stores/userOrder";
import {SITE_TITLE} from "../../../site/info";

export default function HeadersPublic() {
    const [state, nul] = useContext(OrderContext);
    const {order} = state;
    return (
        <div className="w-full flex justify-center py-3 border-b">
            <div className="w-10/12 flex items-center">
                <header className="w-full">
                    <div className="grid grid-cols-3 items-center">
                        <div className="col-span-2 grid grid-cols-2">
                            <div className="col-span-1">
                                <Link href={"/"}>
                                    <a className="text-4xl font-medium">{SITE_TITLE}</a>
                                </Link>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="w-full flex space-x-4">
                                <Link href={"/"}>
                                    <a className="w-1/3 text-center text-gray-600 hover:text-black">Inicio</a>
                                </Link>
                                <Link href={"/products"}>
                                    <a className="w-1/3 text-center text-gray-600 hover:text-black">Productos</a>
                                </Link>
                                <Link href={"/cart"}>
                                    <a className="w-1/3 text-center flex items-center justify-center text-gray-600 hover:text-black">
                                        <img
                                            alt="Shopping cart icon"
                                            className="inline mr-3"
                                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBkPSJNIDMuNSA2IEEgMS41MDAxNSAxLjUwMDE1IDAgMSAwIDMuNSA5IEwgNi4yNTU4NTk0IDkgQyA2Ljk4Mzc5MjMgOSA3LjU5MDU4NjUgOS41MDI5MjQzIDcuNzI4NTE1NiAxMC4yMTg3NSBMIDguMDI3MzQzOCAxMS43ODEyNSBMIDExLjI1MTk1MyAyOC43MTY3OTcgQyAxMS44MzUwNjggMzEuNzcyMzIxIDE0LjUyNzEzNSAzNCAxNy42Mzg2NzIgMzQgTCAzNi4zNjEzMjggMzQgQyAzOS40NzI4NjUgMzQgNDIuMTY2MDY0IDMxLjc3MzE3NyA0Mi43NDgwNDcgMjguNzE2Nzk3IEwgNDUuOTcyNjU2IDExLjc4MTI1IEEgMS41MDAxNSAxLjUwMDE1IDAgMCAwIDQ0LjUgMTAgTCAxMC43NDAyMzQgMTAgTCAxMC42NzU3ODEgOS42NTgyMDMxIEMgMTAuMjcyNjU3IDcuNTQ1NTMyMSA4LjQwNjk3MDUgNiA2LjI1NTg1OTQgNiBMIDMuNSA2IHogTSAxMS4zMTI1IDEzIEwgNDIuNjg3NSAxMyBMIDM5LjgwMDc4MSAyOC4xNTYyNSBDIDM5LjQ4NDc2NCAyOS44MTU4NyAzOC4wNTE3OTEgMzEgMzYuMzYxMzI4IDMxIEwgMTcuNjM4NjcyIDMxIEMgMTUuOTQ4ODA4IDMxIDE0LjUxNjc4MSAyOS44MTU4IDE0LjE5OTIxOSAyOC4xNTYyNSBMIDE0LjE5OTIxOSAyOC4xNTQyOTcgTCAxMS4zMTI1IDEzIHogTSAyMCAzNiBBIDMgMyAwIDAgMCAyMCA0MiBBIDMgMyAwIDAgMCAyMCAzNiB6IE0gMzQgMzYgQSAzIDMgMCAwIDAgMzQgNDIgQSAzIDMgMCAwIDAgMzQgMzYgeiI+PC9wYXRoPjwvc3ZnPg=="
                                        />
                                        ({order.itemCount || 0})
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    )
}