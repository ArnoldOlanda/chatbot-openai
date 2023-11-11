import express from "express";
import cors from "cors";
import morgan from "morgan";
import { completion } from "./openai/completionBase";

export class Server {
    constructor(
        private port = process.env.PORT || 4000,
        private app = express()
    ) {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan("dev"));

        this.routes();
    }

    routes() {
        this.app.post("/api/v1/completion", async (req, res) => {
            try {
                const { prompt } = req.body;
                const stream = await completion(prompt);

                if (!stream) {
                    throw new Error("GPT not response");
                }

                for await (const part of stream) {
                    res.write(part.choices[0]?.delta?.content || "");
                }
                res.end();
            } catch (error) {
                console.log(error);
            }
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on port ${this.port}`);
        });
    }
}
