import runQuery from "../src/graphql/queries/runQuery";
import {MAIN_QUERY} from "../src/graphql/queries/main";
import PagesError from "../src/pages/error";
import LayoutApplication from "../src/components/Layout/application";
import SHOW_CART_QUERY from "../src/graphql/queries/pages/cart";
import CartShow from "../src/components/Cart/Show";
import {gql, useQuery} from '@apollo/client'
import withApollo from '../src/lib/apollo'

const PagesCart = ({data}) => {

    return (
        <LayoutApplication
            currentOrder={data.currentOrder}
            data={data}
        >
            <div className="w-full flex justify-center">
                <div className="w-10/12">
                    <CartShow/>
                </div>
            </div>
        </LayoutApplication>
    )
}

export async function getServerSideProps() {
    const data = await runQuery(MAIN_QUERY())
    return {
        props: {
            data: data
        }
    }
}

export default withApollo({ssrc: true})(PagesCart)