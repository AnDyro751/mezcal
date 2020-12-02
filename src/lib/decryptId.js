export default function decryptId(id = null) {
    try {
        let masterId = Buffer.from(id, 'base64').toString();
        let separators = masterId.split("-")
        return separators[separators.length - 1].toLocaleString();
    } catch (e) {
        console.error(e, "ERROR AL DESENCRIPTAR ID")
        return null
    }
}