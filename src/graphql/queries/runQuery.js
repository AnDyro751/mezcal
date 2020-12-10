import {gql} from "@apollo/client";
import {initializeApollo} from "../../lib/apolloClient";

const apolloClient = initializeApollo()

const runQuery = (currentQuery, variables = {}) => {
    const getQuery = async () => {
        let data = {};
        try {
            data = await apolloClient.query({
                query: gql`${currentQuery}`,
                fetchPolicy: "no-cache",
                variables: variables
            })
            data = data.data
            console.log(data)
            return data;
        } catch (e) {
            console.log(e, "ERROR")
            return null
        }
    }
    return getQuery()
}

export default runQuery