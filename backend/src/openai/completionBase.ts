import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: `${process.env.OPENAI_API_KEY}`, // defaults to process.env["OPENAI_API_KEY"]
});

export async function completion(prompt: string) {
    try {
        const stream = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            stream: true,
        });

        return stream;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
