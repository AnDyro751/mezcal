import LayoutApplication from "../src/components/Layout/application";
import withApollo from "../src/lib/apollo";

function Home() {
    return (
        <LayoutApplication>
            <h1 className="text-4xl">Index</h1>
        </LayoutApplication>
    )
}

export default withApollo({ssr: true})(Home)


