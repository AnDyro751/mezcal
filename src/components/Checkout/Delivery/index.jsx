import {useMutation, gql} from "@apollo/client";
import withApollo from "../../../lib/apollo";
import NEXT_STATE_MUTATION from "../../../graphql/mutations/cart/nextState";


function ComponentCheckoutDelivery({currentOrder = {}}) {
    console.info(currentOrder);
    return (
        <div className="w-full">
            <button>Siguiente</button>
        </div>
    )
}

export default withApollo({ssrc: true})(ComponentCheckoutDelivery)