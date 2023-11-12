export interface Message {
    id: number;
    type: "user" | "assistant";
    text: string;
}
