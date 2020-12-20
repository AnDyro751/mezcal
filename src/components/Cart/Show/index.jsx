import CartListLineItems from "../ListLineItems";
import {gql, useQuery} from "@apollo/client";
import {MAIN_QUERY} from "../../../graphql/queries/main";
import SHOW_CART_QUERY from "../../../graphql/queries/pages/cart";
import withApollo from "../../../lib/apollo";
import CartTotalInfo from "../TotalInfo";
import CartCouponsInfo from "../CouponsInfo";
import {useContext} from "react";
import {OrderContext} from "../../../stores/userOrder";
import Link from 'next/link'

const CartShow = ({}) => {
    const [state, dispatch] = useContext(OrderContext);

    const {data, loading, error} = useQuery(gql`${MAIN_QUERY(null, SHOW_CART_QUERY)}`, {
        ssr: true,
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            dispatch({type: "UPDATE_ORDER", payload: {...state.order, ...data.currentOrder}});
        }
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
            <CartTotalInfo currentOrder={data.currentOrder}/>
            <CartCouponsInfo currentOrder={data.currentOrder}/>
            <Link href={"/checkout"}>Continuar</Link>
        </div>
    )
}

export default withApollo({ssr: true})(CartShow);
