import { useEffect, useState } from "react";
import { Message } from "../interfaces";
import { getCompletion } from "../services/getCompletion";

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [assistantResponse, setAssistantResponse] = useState("");

    const handleClickAddMessage = (message: string) => {
        setMessages((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                type: "user",
                text: message,
            },
        ]);
    };

    const processPrompt = async (prompt: string) => {
        const reader = await getCompletion(prompt);
        if (!reader) {
            throw new Error("No se pudo obtener el stream");
        }
        setMessages((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                type: "assistant",
                text: assistantResponse,
            },
        ]);

        const processStream = async () => {
            const { done, value } = await reader.read();
            if (done) {
                console.log("Streaming response completada.");
                setAssistantResponse("");
                return;
            }

            // Actualiza el estado para agregar los nuevos datos al contenido existente
            setAssistantResponse(
                (prevData) => prevData + new TextDecoder("utf-8").decode(value)
            );

            // Llama a processStream de nuevo para seguir leyendo el flujo
            processStream();
        };

        processStream();
    };

    useEffect(() => {
        if (assistantResponse.length > 0) {
            const newMessages = messages.slice(0, messages.length - 1);
            setMessages((prev) => [
                ...newMessages,
                {
                    id: prev.length + 1,
                    type: "assistant",
                    text: assistantResponse,
                },
            ]);
        }
    }, [assistantResponse]);

    return {
        messages,
        handleClickAddMessage,
        processPrompt,
    };
};
