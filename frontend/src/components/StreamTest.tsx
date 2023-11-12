import { useState } from "react";
import { URL } from "../api";

export function StreamTest() {
    const [assistantResponse, setAssistantResponse] = useState("");

    const getCompletion = async (prompt: string) => {
        try {
            const response = await fetch(URL, {
                method: "post",
                body: JSON.stringify({
                    prompt,
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            if (!response.body) {
                throw new Error("La respuesta no es un flujo (stream)");
            }

            const reader = response.body.getReader();

            const processStream = async () => {
                const { done, value } = await reader.read();
                if (done) {
                    console.log("Streaming response completada.");
                    // setAssistantResponse("");
                    return;
                }

                // Actualiza el estado para agregar los nuevos datos al contenido existente
                setAssistantResponse(
                    (prevData) =>
                        prevData + new TextDecoder("utf-8").decode(value)
                );

                // Llama a processStream de nuevo para seguir leyendo el flujo
                processStream();
            };

            processStream();
        } catch (error) {
            console.error("Error al consumir la streaming response:", error);
        }
    };
    const handleClickGetCompletion = () => {
        getCompletion("Di hola a este test");
    };

    return (
        <div>
            <button onClick={handleClickGetCompletion}>Get Completion</button>
            <p>{assistantResponse}</p>
        </div>
    );
}
