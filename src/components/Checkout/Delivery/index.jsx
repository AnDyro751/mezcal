import ComponentsCheckoutShipping from "../Shipping";
import {useQuery} from "@apollo/client";
import PAGE_DELIVERY_QUERY from "../../../graphql/queries/pages/delivery";
import Link from 'next/link';

function ComponentCheckoutDelivery({}) {
    const {data: dataQuery, loading: loadingQuery} = useQuery(PAGE_DELIVERY_QUERY);


    if (loadingQuery) {
        return (
            <h2>Cargando envíos</h2>
        )
    }

    return (
        <div className="w-full mx-auto">
            <div className="w-full space-y-4">
                <div className="w-full space-y-4">
                    <h3>Envíos</h3>
                    {
                        dataQuery.currentOrder.shipments.nodes.map((shipment, i) =>
                            <ComponentsCheckoutShipping shipping={shipment} key={i}/>
                        )
                    }
                </div>
                <div className="w-full">
                    <Link href={"/payment"}>
                        <a>Siguiente</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ComponentCheckoutDelivery
