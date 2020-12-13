import {gql} from "@apollo/client";
import {initializeApollo} from "../../lib/apolloClient";

const apolloClient = initializeApollo()

const runQuery = (currentQuery, variables = {}) => {
    const getQuery = async () => {
        let data = {};
        try {
            data = await apolloClient.query({
                query: gql`${currentQuery}`,
                fetchPolicy: "cache-first",
                variables: variables
            })
            data = data.data
            return data;
        } catch (e) {
            return null
        }
    }
    return getQuery()
}

export default runQuery