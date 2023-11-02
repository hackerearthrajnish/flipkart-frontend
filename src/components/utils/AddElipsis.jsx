
const AddElipsis = (text) => {

    if (text && text.length > 50) {
        return text.substring(0, 50) + '....'
    }
    else  return text
}

export default AddElipsis
