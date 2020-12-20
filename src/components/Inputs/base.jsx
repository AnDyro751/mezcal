export default function InputBase({label = null, value = "", placeholder = "", type = "text", id = "", className = ""}) {
    return (
        <div className="w-full">
            {label &&
            <label className="mb-2 w-full block text-sm text-gray-500" htmlFor={id}>{label}</label>
            }
            <input
                value={value}
                id={id}
                placeholder={placeholder}
                className={`${className ? "" : "py-3 w-full rounded px-3 bg-gray-200 text-black font-normal focus:outline-none"}`}
                type={type}
            />
        </div>
    )
}