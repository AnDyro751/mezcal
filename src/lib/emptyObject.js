const emptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}
export default emptyObject