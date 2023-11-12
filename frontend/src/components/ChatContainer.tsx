import { useEffect, useRef } from "react";
import { Message } from "../interfaces";
import { MessageBox } from "./MessageBox";
import { Variants, motion } from "framer-motion";

interface Props {
    messages: Message[];
}

export const ChatContainer = ({ messages }: Props) => {
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    const list: Variants = {
        visible: {
            opacity: 1,
            transition: { delayChildren: 0.3, staggerChildren: 0.05 },
        },
        hidden: {
            opacity: 0,
        },
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <motion.div
            ref={chatContainerRef}
            className="container flex flex-col w-[100%] md:w-[70%] lg:w-[50%] min-h-[80vh] overflow-auto overflow-x-hidden p-2"
            initial="hidden"
            animate="visible"
            variants={list}
        >
            {messages.map((message) => (
                <MessageBox
                    key={message.id}
                    type={message.type}
                    text={message.text}
                />
            ))}
        </motion.div>
    );
};
