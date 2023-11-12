import { URL } from "../api";

export const getCompletion = async (prompt: string) => {
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

        return reader;

        // processStream();
    } catch (error) {
        console.error("Error al consumir la streaming response:", error);
    }
};
