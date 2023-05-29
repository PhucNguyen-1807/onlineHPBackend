require('dotenv').config()

let time=()=>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Adding 1 because months are zero-based
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    return day+'-'+month+'-'+year+','+hours+':'+minutes+':'+seconds
}
module.exports = time