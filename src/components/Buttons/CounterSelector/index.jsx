import {useState} from 'react';

export const CounterSelector = ({handleChange, defaultValue = 1, big = true, handleBlur = null}) => {
    const [defaultCounter, setDefaultCounter] = useState(defaultValue);
    if (big) {
        return (
            <div className="w-full flex items-center mb-6">
                <div className="w-4/12">
                    <label htmlFor="add_to_cart[select_quantity]">Cantidad</label>
                </div>
                <select
                    id="add_to_cart[select_quantity]"
                    onChange={handleChange}
                    defaultValue={defaultValue}
                    className="w-8/12 focus:ring-indigo-500 focus:border-indigo-500 h-full py-3 pl-4 font-medium text-black pr-6 border-transparent bg-gray-100 pr-6 select appearance-none rounded-md">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        )
    } else {
        return (
            <div className="w-full bg-gray-100 flex items-center">
                <div
                    onClick={() => {
                        if (defaultCounter <= 0) {
                            setDefaultCounter(0);
                        } else {
                            setDefaultCounter(prevState => ((prevState || 0) - 1));
                        }
                    }}
                    className="w-3/12 py-3 flex justify-center font-medium text-gray-700 text-lg cursor-pointer">
                    -
                </div>
                <input
                    className="py-3 bg-gray-100 text-center w-full rounded appearance-none w-6/12"
                    type="number"
                    // defaultValue={defaultValue}
                    // onChangeCapture={}
                    // onChangeCapture={}
                    value={parseInt(defaultCounter) || 0}
                    onBlur={(e) => {
                        if (defaultValue !== parseInt(e.target.value)) {
                            // console.log("BLUR");
                            if (handleBlur) {
                                handleBlur(e);
                            }
                        }
                    }}
                    onChange={(e) => {
                        let newValue = parseInt(e.target.value)
                        if (newValue <= 0) {
                            setDefaultCounter(0);
                        } else {
                            setDefaultCounter(newValue || 0);
                            handleChange(e);
                        }
                    }}
                />
                <div
                    onClick={() => {
                        setDefaultCounter(prevState => ((prevState || 0) + 1))
                    }}
                    className="w-3/12 py-3 cursor-pointer flex justify-center font-medium text-gray-700 text-lg">
                    +
                </div>
            </div>

        )
    }
}