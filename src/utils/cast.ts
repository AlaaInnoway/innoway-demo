export default function prettyDecimal(value: string = '') {
    if(parseFloat(value) % 1 !== 0)
        return (parseFloat(value).toFixed(2))
    return (parseFloat(value).toString());
}