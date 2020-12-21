import {useMutation, gql} from "@apollo/client";
import withApollo from "../../../lib/apollo";

const NEXT_STATE_MUTATION = gql`
mutation{
  nextCheckoutState(input:{clientMutationId:""}){
    order{
        shipments{
          nodes{
            manifest{
              quantity
            }
            shippingRates{
              nodes{
                cost
                currency
                id
                selected
                shippingMethod{
                    name
                }
              }
            }
          }
        }
      total
    }
    errors{
      path
      message
    }
  }
}
`

function ComponentCheckoutDelivery({currentOrder = {}}) {
    console.info(currentOrder);
    const [toNextState, {data, loading, error}] = useMutation(NEXT_STATE_MUTATION, {
        onError: (e) => {
            console.log(e, "ERROR")
        },
        onCompleted: (completedData) => {
            console.log("DATA", completedData)
        },
        variables: {
            input: {
                clientMutationId: "demo1"
            }
        }
    });
    const handleClick = () => {
        toNextState()
    }
    return (
        <div className="w-full">
            <button onClick={handleClick}>Siguiente</button>
        </div>
    )
}

export default withApollo({ssrc: true})(ComponentCheckoutDelivery)