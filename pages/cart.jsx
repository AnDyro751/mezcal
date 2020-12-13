import runQuery from "../src/graphql/queries/runQuery";
import {MAIN_QUERY} from "../src/graphql/queries/main";
import PagesError from "../src/pages/error";
import LayoutApplication from "../src/components/Layout/application";
import SHOW_CART_QUERY from "../src/graphql/queries/pages/cart";
import CartShow from "../src/components/Cart/Show";
import {gql, useQuery} from '@apollo/client'
import withApollo from '../src/lib/apollo'

const PagesCart = () => {
    const {data, loading, error} = useQuery(gql`${MAIN_QUERY(null, SHOW_CART_QUERY)}`, {
        ssr: true,
    });
    // const {currentOrder} = data;
    if (loading) {
        return (
            <h2>CARGANDO</h2>
        )
    }
    const {currentOrder} = data

    return (
        <LayoutApplication currentOrder={currentOrder}
                           data={data}
        >
            <div className="w-full flex justify-center">
                <div className="w-10/12">
                    <CartShow currentOrder={currentOrder}/>
                </div>
            </div>
        </LayoutApplication>
    )
}

// export async function getServerSideProps() {
//     const data = await runQuery(MAIN_QUERY(null, SHOW_CART_QUERY))
//     return {
//         props: {
//             data: data
//         }
//     }
// }

export default withApollo({ssrc: true})(PagesCart)