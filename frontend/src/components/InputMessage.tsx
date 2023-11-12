import { BsSendFill, BsFillMicFill } from "react-icons/bs";
import { useInputMessageChat } from "../hooks/useInputMessageChat";

interface Props {
    onAddMessage: (m: string) => void;
    processPrompt: (p: string) => void;
}

export const InputMessage = (props: Props) => {
    const {
        browserSupportsSpeechRecognition,
        handleClickSend,
        handleClickStarRecognition,
        inputMessage,
        setInputMessage,
        listening,
    } = useInputMessageChat(props.onAddMessage, props.processPrompt);

    return (
        <div className="flex w-[100%] md:w-[70%] lg:w-[50%] bg-gray-100 rounded-[20px] z-10 p-1">
            <textarea
                className="w-full min-h-12 pt-4 pl-3 bg-transparent outline-none resize-none"
                placeholder="Send a mesage"
                value={inputMessage}
                onChange={({ target }) => setInputMessage(target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleClickSend();
                    }
                }}
            />
            <div className="flex items-center">
                {browserSupportsSpeechRecognition ? (
                    <BsFillMicFill
                        className={`ml-2 mr-2 text-gray-700 hover:text-red-800 ${
                            listening
                                ? "animate-bounce scale-50 text-red-800"
                                : ""
                        }`}
                        onClick={handleClickStarRecognition}
                        size={20}
                    />
                ) : null}
                <BsSendFill
                    className="ml-2 mr-5 text-gray-700 hover:text-blue-900 active:text-gray-950"
                    size={20}
                    onClick={handleClickSend}
                />
            </div>
        </div>
    );
};
