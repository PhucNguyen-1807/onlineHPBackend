const { Configuration, OpenAIApi } =require ("openai");
const configuration = new Configuration({
    organization: "org-xwcqbD0263JXvNtQRd5uSx5o",
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);
const searchGPT=async(comment)=>{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: 
            `comment: ${comment}\n`+
            `specialist: [Tổng Quát,Đa Khoa,Xương Khớp,Nội Soi,Tai Mũi Họng,Nội Tiêu Hóa]\n`+
            `choose in specialist:`,
            max_tokens: 25,
            temperature: 0,
        });
return response.data.choices[0].text
// console.log(response.data.choices[0].text);
}
// searchGPT("tôi bị đau bụng")
module.exports = searchGPT