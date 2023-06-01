const { Configuration, OpenAIApi } =require ("openai");
require("dotenv").config();
const configuration = new Configuration({
    organization: "org-xwcqbD0263JXvNtQRd5uSx5o",
    apiKey: process.env.API_KEY
});
const openai = new OpenAIApi(configuration);
const searchGPT=async(comment)=>{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: 
            `symptoms: ${comment}\n`+
            `specialist: [General Practitioner,Orthopedics,Otorhinolaryngology,Infectious Diseases,Psychology,Neurology,Gastroenterology,Obstetrics and Gynecology,Dermatology,Pediatrics,Cardiology,Vaccination,Nutrition]\n`+
            `choose the suitable specialist:`,
            stop:["\n","symptoms:","specialist:","choose the suitable specialist"],
            max_tokens: 100,
            temperature: 0.3    ,
        });
console.log(response.data.choices[0].text);
return response.data.choices[0].text
}
// searchGPT("tôi bị đau bụng")
module.exports = searchGPT
// `specialist: [Đa Khoa,Khoa Xương Khớp,Khoa Tai Mũi Họng,Khoa Truyền Nhiễm,Khoa Tâm lí học,Khoa Tâm thần kinh,Khoa Nội tiêu hóa,Khoa sản,Da liễu,Khoa nhi,Khoa Tim mạch,Khoa Tiêm chủng,Khoa Dinh dưỡng]\n`+
// `specialist: [Đa Khoa,Xương Khớp,Tai Mũi Họng,Truyền Nhiễm,Tâm lí học,Tâm thần kinh,Nội tiêu hóa,Khoa sản,Da liễu,Khoa nhi,Tim mạch,Tiêm chủng,Dinh dưỡng]\n`+
// `specialist: [General Practitioner,Orthopedics,Otorhinolaryngology,Infectious Diseases,Psychology,Neurology,Gastroenterology,Obstetrics and Gynecology,Dermatology,Pediatrics,Cardiology,Vaccination,Nutrition]\n`+
