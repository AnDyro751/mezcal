import PagesError from "../src/pages/error";
import LayoutApplication from "../src/components/Layout/application";
import runQuery from "../src/graphql/queries/runQuery";
import {MAIN_QUERY} from "../src/graphql/queries/main";
import PAGE_DELIVERY_QUERY from "../src/graphql/queries/pages/delivery";
import ComponentsCheckoutPayment from "../src/components/Checkout/Payment";

export default function PagesPayment({data}) {
    if (!data) {
        return (
            <PagesError message={"Ha ocurrido un error"}/>
        )
    }
    return (
        <LayoutApplication
            currentOrder={data.currentOrder}
        >
            <ComponentsCheckoutPayment />
        </LayoutApplication>
    )
}


export async function getServerSideProps({res}) {
    const data = await runQuery(MAIN_QUERY(null, PAGE_DELIVERY_QUERY));
    if (!data) {
        res.statusCode = 400;
    } else {
        if (data.currentOrder) {
            if (data.currentOrder.shipments.nodes.length > 0) {
                if (data.currentOrder.shipments.nodes[0].shippingRates.nodes.length > 0) {

                } else {
                    res.writeHead(307, {
                        Location: "/checkout"
                    })
                    res.end();
                }
            } else {
                res.writeHead(307, {
                    Location: "/checkout"
                })
                res.end();
            }
        } else {
            res.writeHead(307, {
                Location: "/products"
            })
            res.end();
        }
    }
    return {
        props: {
            data: data,
        }
    }
}