export const CounterSelector = ({handleChange, defaultValue}) => {
    return (
        <div className="w-full flex items-center mb-6">
            <div className="w-4/12">
                <label htmlFor="add_to_cart[select_quantity]">Cantidad</label>
            </div>
            <select
                id="add_to_cart[select_quantity]"
                onChange={handleChange}
                className="w-8/12 focus:ring-indigo-500 focus:border-indigo-500 h-full py-3 pl-4 font-medium text-black pr-6 border-transparent bg-gray-100 pr-6 select appearance-none rounded-md">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    )
}