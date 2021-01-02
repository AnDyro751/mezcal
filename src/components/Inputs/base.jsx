export default function InputBase({autoComplete = null, label = null, error = null, onBlur = null, name = "", value = "", onChange = null, placeholder = "", type = "text", id = "", className = "", withButton = null}) {
    return (
        <div className="w-full">
            {label &&
            <label className="mb-2 w-full block text-sm text-gray-500" htmlFor={id}>{label}</label>
            }
            <div className="w-full relative">
                <input
                    onBlur={(e) => {
                        onBlur ? onBlur(e) : null
                    }}
                    autoComplete={autoComplete}
                    name={name}
                    value={value}
                    onChange={(e) => {
                        onChange ? onChange(e) : null
                    }}
                    id={id}
                    placeholder={placeholder}
                    className={`${error ? "border-red-400" : "border-transparent"} ${className ? className : ""} border-2 uppercase font-medium text-sm py-3 w-full rounded px-3 bg-gray-200 text-black font-normal focus:outline-none`}
                    type={type}
                />
                {
                    withButton &&
                    withButton()
                }
            </div>
            {
                error &&
                <p>
                <span className="text-xs font-medium uppercase text-red-600">
                    {
                        error
                    }
                </span>
                </p>
            }
        </div>
    )
}