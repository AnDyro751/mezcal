import LayoutApplication from "../src/components/Layout/application";
import CartShow from "../src/components/Cart/Show";
import withApollo from "../src/lib/apollo";

// Cart steps
// cart
// address
// delivery
// payment
// confirm
// complete

const PagesCart = () => {
    return (
        <LayoutApplication>
            <div className="w-full flex justify-center">
                <div className="w-10/12">
                    <CartShow/>
                </div>
            </div>
        </LayoutApplication>
    )
}
export default withApollo({ssr: true})(PagesCart)
//
// export async function getServerSideProps({res}) {
//     const data = await runQuery(MAIN_QUERY());
//     // if (data) {
//         // if (data.currentOrder) {
//         //     if (data.currentOrder.state !== "cart") {
//         //         res.writeHead(307, {
//         //             Location: `/${data.currentOrder.state}`
//         //         })
//         //         res.end();
//         //     }
//         // }
//     // }
//     return {
//         props: {
//             data: data
//         }
//     }
// }
//
