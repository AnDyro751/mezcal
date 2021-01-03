export default function InputBase({autoComplete = null, label = null, error = null, first = false, last = false, onBlur = null, name = "", value = "", onChange = null, placeholder = "", type = "text", id = "", className = "", withButton = null}) {
    return (
        <div className={`${error ? "my-0" : "w-full"}`}>
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
                    className={`${error ? "text-red-600 z-10 shadow-input-error" : "shadow-input z-0"}  relative ${last ? "rounded-b" : ""} ${first ? "rounded-t" : ""} ${className ? className : ""} uppercase font-medium text-sm py-3 w-full px-3 bg-white text-black font-normal focus:outline-none`}
                    type={type}
                />
                {
                    withButton &&
                    withButton()
                }
            </div>
            {/*{*/}
            {/*    error &&*/}
            {/*    <p>*/}
            {/*    <span className="text-xs font-medium uppercase text-red-600">*/}
            {/*        {*/}
            {/*            error*/}
            {/*        }*/}
            {/*    </span>*/}
            {/*    </p>*/}
            {/*}*/}
        </div>
    )
}