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
            `comment: ${comment}\n`+
            `specialist: [Đa Khoa,Xương Khớp,Tai Mũi Họng,Truyền Nhiễm,Tâm lí học,Tâm thần kinh,Nội tiêu hóa,Khoa sản,Da liễu,Khoa nhi,Tim mạch,Tiêm chủng,Dinh dưỡng]\n`+
            `choose in specialist:`,
            max_tokens: 25,
            temperature: 0,
        });
return response.data.choices[0].text
// console.log(response.data.choices[0].text);
}
// searchGPT("tôi bị đau bụng")
module.exports = searchGPT