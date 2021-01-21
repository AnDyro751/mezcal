export default function removeCookie(cookieName) {
    document.cookie = `${cookieName}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
}