import runQuery from "../src/graphql/queries/runQuery";
import {MAIN_QUERY} from "../src/graphql/queries/main";
import LayoutApplication from "../src/components/Layout/application";
import CartShow from "../src/components/Cart/Show";

const PagesCart = ({data}) => {

    return (
        <LayoutApplication
            currentOrder={data.currentOrder}
        >
            <div className="w-full flex justify-center">
                <div className="w-10/12">
                    <CartShow/>
                </div>
            </div>
        </LayoutApplication>
    )
}

export default PagesCart

export async function getServerSideProps({res}) {
    const data = await runQuery(MAIN_QUERY());
    if (data) {
        if (data.currentOrder) {
            if (data.currentOrder.state !== "cart") {
                res.writeHead(307, {
                    Location: `/${data.currentOrder.state}`
                })
                res.end();
            }
        }
    }
    return {
        props: {
            data: data
        }
    }
}

