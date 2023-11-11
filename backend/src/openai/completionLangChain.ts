import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: `${process.env.OPENAI_API_KEY}`, // defaults to process.env["OPENAI_API_KEY"]
});

export async function completionLangChain(prompt: string) {
    try {
        const stream = await axios.post("http://192.168.254.10:5000/chat", {
            promt: prompt,
        });

        return stream;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
