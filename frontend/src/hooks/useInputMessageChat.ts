import { useEffect, useState } from "react";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

type AddMessage = (m: string) => void;
type ProcessPrompt = (p: string) => void;

export const useInputMessageChat = (
    onAddMessage: AddMessage,
    processPrompt: ProcessPrompt
) => {
    const [inputMessage, setInputMessage] = useState("");

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const handleClickStarRecognition = () => {
        SpeechRecognition.startListening({ continuous: true });
        console.log("grabando");
    };

    const handleClickSend = () => {
        if (inputMessage.trim().length > 0) {
            if (listening) {
                SpeechRecognition.stopListening();
                console.log("detenido");
            }
            onAddMessage(inputMessage);
            processPrompt(inputMessage);
            resetTranscript();
            setInputMessage("");
        }
    };

    useEffect(() => {
        setInputMessage(transcript);
    }, [transcript]);
    return {
        inputMessage,
        setInputMessage,
        listening,
        handleClickSend,
        browserSupportsSpeechRecognition,
        handleClickStarRecognition,
    };
};
