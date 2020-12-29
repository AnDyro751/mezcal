export default function InputBaseSelect({defaultValue = "", label = null, error, handleChange = null, options = [], name = "", id = "", placeholder = null}) {
    return (
        <div className="w-full">
            {label &&
            <label className="mb-2 w-full block text-sm text-gray-500" htmlFor={id}>{label}</label>
            }
            <select
                defaultValue={defaultValue}
                name={name}
                id={id}
                onChange={(e) => {
                    handleChange ? handleChange(e) : null
                }}
                className={`${error ? "border-red-400" : "border-transparent"} border-2 w-full py-3 px-4 bg-gray-200 rounded focus:outline-none select appearance-none`}>
                {
                    placeholder &&
                    <option
                        value={""}
                    >
                        {placeholder}
                    </option>
                }
                {options.map((option, i) => (
                    <option

                        key={i} value={option.id}>{option.name}</option>
                ))}
            </select>
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