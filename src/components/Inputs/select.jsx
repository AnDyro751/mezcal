export default function InputSelect({name = "", id = null, options = []}, handleChange = null, label = null) {
    return (
        <div className="w-full">
            {label &&
            <label className="mb-2 w-full block text-sm text-gray-500" htmlFor={id}>{label}</label>
            }

            {label ? "SI HAY" : "NO HAY"}
            <select name={name}
                    id={id}
                    onChange={(e) => {
                        handleChange ? handleChange(e) : null
                    }}
                    className="w-full py-3 px-4 bg-gray-200 rounded focus:outline-none select appearance-none">
                {options.map((option, i) => (
                    <option key={i} value={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}