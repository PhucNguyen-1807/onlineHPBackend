const { Configuration, OpenAIApi } =require ("openai");
const configuration = new Configuration({
    organization: "org-3hFtOYDvgFU4oMFAR4OtADD1",
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);
const fun=async()=>{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Say this is a test",
            max_tokens: 7,
            temperature: 0,
        });
console.log(response.data.choices[0].text)
}
fun()