import {useEffect, useState} from "react";

export default function OnePageStepper({text = "", open = false, children, handleOpen = null, small = false}) {
    const [newOpen, setNewOpen] = useState(open)
    const handleClick = () => {
        setNewOpen(!newOpen);
        if (handleOpen) {
            handleOpen(!newOpen);
        }
    };

    useEffect(() => {
        setNewOpen(open);
    }, [open]);

    return (
        <div className="w-full">
            <div
                onClick={handleClick}
                className={`font-medium text-gray-700 ${small ? "text-sm" : "text-lg"}`}>
                <span>{text}</span>
            </div>
            <div className="w-full mt-4">
                {children}
            </div>
        </div>
    )
}