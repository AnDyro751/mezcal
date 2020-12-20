import {useContext, useState} from 'react';
import SetEmailInput from "../SetEmailInput";
import SetAddressData from "../SetAddressData";

export default function ComponentsCheckoutAddress() {
    return (
        <div className="w-10/12 mx-auto mt-10">
            <h1 className="text-4xl font-medium mb-10 uppercase">Checkout</h1>
            <div className="w-full flex space-x-4">
                <div className="w-6/12 space-y-4">
                    <h3 className="text-lg text-gray-800">Información de contacto</h3>
                    <div className="w-full">
                        <SetEmailInput/>
                    </div>
                    <h3 className="text-lg text-gray-800">Dirección de envío</h3>
                    <div className="w-full">
                        <SetAddressData />
                    </div>
                </div>
            </div>
        </div>
    )
}