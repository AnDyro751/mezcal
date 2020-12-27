import {useEffect, useState} from "react";

export default function OnePageStepper({text = "", open = false, children}) {
    const [newOpen, setNewOpen] = useState(open)
    const handleClick = () => {
        setNewOpen(!newOpen);
    };

    useEffect(() => {
        setNewOpen(open);
    }, [open]);

    return (
        <div className="w-full">
            <div
                onClick={handleClick}
                className="px-8 py-2 flex items-center select-none font-medium cursor-pointer bg-black text-white font-normal uppercase">
                <div className="w-10/12">
                    <span>{text}</span>
                </div>
                <div className="w-2/12 flex justify-end">
                    <img alt="svgImg"
                         className={`transform ${newOpen ? "rotate-180" : ""}`}
                         src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTM1LjgzMzMzLDY0LjVsNTAuMTY2NjcsNjQuNWw1MC4xNjY2NywtNjQuNXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="/>
                </div>
            </div>
            {
                newOpen &&
                children
            }
        </div>
    )
}