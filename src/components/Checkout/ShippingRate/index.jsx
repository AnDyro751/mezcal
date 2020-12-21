import {useState, useEffect} from 'react';

export default function ComponentsCheckoutShippingRate({shippingRate = {}, checked = false, handleSelect}) {
    const [checkedInput, setChecked] = useState(checked);
    useEffect(() => {
        setChecked(checked);
    }, [checked])

    return (
        <div
            onClick={() => {
                if (checkedInput) {
                    handleSelect("");
                } else {
                    handleSelect(shippingRate.id);
                }
                setChecked(!checkedInput);
            }}
            className="w-full p-3 space-x-4 rounded border cursor-pointer border-gray-300 flex"
        >
            <div className="w-4">
                <input type="radio"
                       checked={checkedInput}
                       onChange={(e) => {
                           setChecked(e.target.checked);
                           if (e.target.checked) {
                               handleSelect(shippingRate.id);
                           } else {
                               handleSelect("");
                           }
                       }}
                />
            </div>
            <div className="w-11/12 flex items-center">
                <div className="w-8/12">
                                            <span className="text-gray-700 font-normal">
                                                {shippingRate.shippingMethod.name}
                                            </span>
                </div>
                <div className="w-4/12 flex justify-end">
                    <span className="font-medium text-sm">({shippingRate.cost}) {shippingRate.currency}</span>
                </div>
            </div>
        </div>
    )
}