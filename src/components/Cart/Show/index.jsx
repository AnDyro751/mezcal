import CartListLineItems from "../ListLineItems";
import {gql, useQuery} from "@apollo/client";
import {MAIN_QUERY} from "../../../graphql/queries/main";
import SHOW_CART_QUERY from "../../../graphql/queries/pages/cart";
import withApollo from "../../../lib/apollo";

const CartShow = ({}) => {
    const {data, loading, error} = useQuery(gql`${MAIN_QUERY(null, SHOW_CART_QUERY)}`, {
        ssr: true,
        fetchPolicy: "no-cache"
    });
    if (loading) {
        return (
            <h2>Cargando carrito</h2>
        )
    }
    if (error) {
        return (
            <h2>ERROR</h2>
        )
    }
    return (
        <div className="w-full">
            <CartListLineItems currentOrder={data.currentOrder}/>
        </div>
    )
}

export default withApollo({ssr: true})(CartShow);
