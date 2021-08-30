function Base64ToBinary(str){
    return decodeURIComponent(Buffer.from(str, 'base64').toString('binary'))
}
function BinaryToBase64(str){
    return Buffer.from(encodeURIComponent(str), 'utf8').toString('base64')
}
export {Base64ToBinary,BinaryToBase64};