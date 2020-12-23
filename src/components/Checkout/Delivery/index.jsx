import withApollo from "../../../lib/apollo";
import ButtonsPrimary from "../../Buttons/primary";
import ComponentsCheckoutShipping from "../Shipping";

function ComponentCheckoutDelivery({currentOrder = {}}) {

    return (
        <div className="w-10/12 mx-auto">
            <div className="w-full space-y-4">
                <div className="md:w-6/12 w-full space-y-4">
                    <h3>Envíos</h3>
                    {
                        currentOrder.shipments.nodes.map((shipment, i) =>
                            <ComponentsCheckoutShipping shipping={shipment} key={i}/>
                        )
                    }
                </div>
                <div className="w-full">
                    <ButtonsPrimary
                        // onClick={handleClick}
                        // disabled={shippingRateSelected.length <= 1}
                        // loading={loading}
                        text={"Continuar con el pago"} customClass="w-full text-center flex justify-center"/>
                </div>
            </div>
        </div>
    )
}

export default withApollo({ssrc: true})(ComponentCheckoutDelivery)