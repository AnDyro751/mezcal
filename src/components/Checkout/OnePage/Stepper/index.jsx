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
                className="px-4 py-2 select-none font-medium cursor-pointer bg-black text-white font-normal uppercase">
                <span>{text}</span>
            </div>
            {
                newOpen &&
                children
            }
        </div>
    )
}