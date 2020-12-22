import {useState, useEffect} from 'react';

export default function ComponentsCheckoutPaymentMethod({checked = false, paymentMethod, handleChange}) {
    const [checkedInput, setChecked] = useState(checked);
    useEffect(() => {
        setChecked(checked);
    }, [checked])
    return (
        <div className="w-full flex space-x-4">
            <div className="w-6">
                <input
                    onChange={(e) => {
                        if (e.target.checked) {
                            handleChange(paymentMethod);
                        } else {
                            handleChange(null)
                        }
                    }}
                    type="radio" checked={checkedInput}/>
            </div>
            {
                paymentMethod.partialName === "gateway" &&
                <span>{paymentMethod.name}</span>
            }
        </div>
    )
}