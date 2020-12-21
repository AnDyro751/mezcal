import LayoutApplication from "../src/components/Layout/application";
import ComponentsCheckoutAddress from "../src/components/Checkout/Address";
import runQuery from "../src/graphql/queries/runQuery";
import {MAIN_QUERY} from "../src/graphql/queries/main";
import PagesError from "../src/pages/error";
import ComponentCheckoutDelivery from "../src/components/Checkout/Delivery";

export default function PagesDelivery({data}) {
    if (!data) {
        return (
            <PagesError message={"Ha ocurrido un error"}/>
        )
    }
    return (
        <LayoutApplication
            currentOrder={data.currentOrder}
        >
            <ComponentCheckoutDelivery currentOrder={data.currentOrder}/>
        </LayoutApplication>
    )
}

export async function getServerSideProps({query, res}) {
    const data = await runQuery(MAIN_QUERY(null, `
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
    shippingAddress {  
      address2
      address1
      phone
      city
      country {
        id
      }
      lastname
      firstname
      zipcode
      stateName
    }
    billingAddress {
      address2
      address1
      phone
      city
      country {
        id
      }
      lastname
      firstname
      zipcode
      stateName
    }`));
    if (!data) {
        res.statusCode = 400;
    }
    return {
        props: {
            data: data,
        }
    }
}