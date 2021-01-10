const getStates = (currentState) => {
    switch (currentState) {
        case "cart":
            return ["cart", "address", "delivery", "payment", "confirm"];
        case "address":
            return ["address", "delivery", "payment", "confirm"];
        case "delivery":
            return ["delivery", "payment", "confirm"];
        case "payment":
            return ["payment", "confirm"];
        case "confirm":
            return ["confirm"];
    }
}
export default function moreState(currentState, compareState) {
    const getResults = getStates(currentState);
    console.log(getResults);
    return getResults.includes(compareState);
}

