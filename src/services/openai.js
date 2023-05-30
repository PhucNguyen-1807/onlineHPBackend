const { Configuration, OpenAIApi } =require ("openai");
const configuration = new Configuration({
    organization: "org-xwcqbD0263JXvNtQRd5uSx5o",
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);
const fun=async()=>{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: 
            `user: han\n` +
            `comment: Cổ họng bị đau rát khi nuốt nước bọt \n`+
            `specialist: [Tổng quát,Đa khoa,Xương khớp,Nội soi,Tai mũi họng,Nội tiêu hóa]\n`+
            `choose in specialist:`,
            max_tokens: 30,
            temperature: 0,
        });
console.log(response.data.choices[0].text)
}
fun()