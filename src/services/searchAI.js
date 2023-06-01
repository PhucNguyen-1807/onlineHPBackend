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
            `medicineType: [Tai mũi họng,Đau đầu,Gây tê,Hạ sốt,Giảm đau bụng]\n`+
            `choose many in medicineType:`,
            max_tokens: 20,
            temperature: 0,
        });
return response.data.choices[0].text
// console.log(response.data.choices[0].text);
}
// searchGPT("bệnh nhân bên tôi có triệu chứng về hen suyễn")
module.exports = searchGPT
// `medicineType: [nhức đầu,đau bụng,ho sổ mũi,gây tê,thực phẩm bổ sung]\n`+
