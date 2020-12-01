import {gql} from "@apollo/client";
import {initializeApollo} from "../../lib/apolloClient";

const apolloClient = initializeApollo()

const runQuery = (currentQuery) => {
    const getQuery = async () => {
        let data = {};
        try {
            data = await apolloClient.query({
                query: gql`${currentQuery}`,
                fetchPolicy: "no-cache"
            })
            data = data.data
            return data;
        } catch (e) {
            console.log(e, "ERROR")
            return {}
        }
    }
    return getQuery()
}

export default runQuery