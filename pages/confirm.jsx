import LayoutApplication from "../src/components/Layout/application";
import CheckoutLayout from "../src/components/Layout/checkout";
import {useMutation, useQuery} from "@apollo/client";
import CONFIRM_PAGE_QUERY from "../src/graphql/queries/pages/confirm";
import {useContext} from "react";
import {OrderContext} from "../src/stores/userOrder";
import withApollo from "../src/lib/apollo";
import ButtonsPrimary from "../src/components/Buttons/primary";
import COMPLETE_CHECKOUT_MUTATION from "../src/graphql/mutations/cart/completeCheckout";

function PagesConfirm({}) {
    const {state, dispatch} = useContext(OrderContext);
    const [completeCheckout, {data: dataComplete, loading: loadingComplete}] = useMutation(COMPLETE_CHECKOUT_MUTATION, {
        onCompleted: (newData) => {
            console.log(newData, "New data");
        }
    });
    const {data, loading, error} = useQuery(CONFIRM_PAGE_QUERY, {
        onCompleted: (newData) => {
            dispatch({
                type: "UPDATE_ORDER",
                payload: {
                    ...state.order,
                    ...newData.currentOrder,
                    billingAddress: {
                        ...newData.currentOrder.billingAddress,
                        stateId: newData.currentOrder.billingAddress ? newData.currentOrder.billingAddress.state ? newData.currentOrder.billingAddress.state.id : "" : ""
                    }
                }
            });
        }
    });

    const handleClick = () => {
        completeCheckout();
    }

    return (
        <LayoutApplication>
            <CheckoutLayout>
                <div className="w-full">
                    <h2>Confirmar orden</h2>
                    <ButtonsPrimary
                        text={"Completar orden"}
                        onClick={handleClick}
                        disabled={loading || loadingComplete}
                    />
                </div>
            </CheckoutLayout>
        </LayoutApplication>
    )
}

export default withApollo({ssr: true})(PagesConfirm)