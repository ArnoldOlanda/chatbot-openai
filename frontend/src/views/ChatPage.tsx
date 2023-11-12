import { ChatContainer } from "../components/ChatContainer";
import { InputMessage } from "../components/InputMessage";
import { useChat } from "../hooks/useChat";

export const ChatPage = () => {
    const { messages, handleClickAddMessage, processPrompt } = useChat();

    return (
        <div className="h-screen p-4 flex flex-col items-center bg-gradient-to-br from-[#05138F] to-[#000]">
            <ChatContainer messages={messages} />
            {/* <SuggestedQuestionsList /> */}
            <InputMessage
                onAddMessage={handleClickAddMessage}
                processPrompt={processPrompt}
            />
        </div>
    );
};
