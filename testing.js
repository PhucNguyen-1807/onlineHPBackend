let specialistString = "Đa Khoa,Xương Khớp,Da liễu";
let specialistArray = specialistString.split(",");
let convertedArray = specialistArray.map(specialist => `"${specialist.trim()}"`);
let convertedString = convertedArray.join(", ");

console.log(specialistString);