import {useContext, useState} from 'react';
import SetEmailInput from "../SetEmailInput";
import SetAddressData from "../SetAddressData";
import {useQuery} from "@apollo/client";
import CHECKOUT_PAGE_QUERY from "../../../graphql/queries/pages/checkout";
import withApollo from "../../../lib/apollo";
import {OrderContext} from "../../../stores/userOrder";

function ComponentsCheckoutAddress({currentOrder}) {
    // const {addToast} = useToasts()
    const {state, dispatch} = useContext(OrderContext);
    const {data, loading, error} = useQuery(CHECKOUT_PAGE_QUERY, {
        variables: {
            isoCode: "MX"
        },
        // onCompleted: (dd) => {
        //     console.log("DD", dd);
        // },
        // onError: () => {
        //     addToast("Ha ocurrido un error al recuperar la información", {appearance: 'error'})
        // }
    });
    if (loading) {
        return (
            <h2>Cargando...</h2>
        )
    }
    return (
        <div className="w-10/12 mx-auto mt-10">
            <h1 className="text-4xl font-medium mb-10 uppercase">Checkout</h1>
            <div className="w-full flex space-x-4">
                <div className="w-6/12 space-y-4">
                    <h3 className="text-lg text-gray-800">Información de contacto</h3>
                    <div className="w-full">
                        <SetEmailInput/>
                    </div>
                    {state.order && state.order.email &&
                    <>
                        <h3 className="text-lg text-gray-800">Dirección de envío</h3>
                        <div className="w-full">
                            <SetAddressData currentOrder={currentOrder} currentCountry={data.countryByIso}/>
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

export default withApollo({ssr: true})(ComponentsCheckoutAddress);
