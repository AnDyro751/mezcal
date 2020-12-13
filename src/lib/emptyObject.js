const emptyObject = (obj) => {
    if (obj === null) {
        return true
    }
    if (typeof obj === "object") {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    } else {
        return true
    }

}
export default emptyObject