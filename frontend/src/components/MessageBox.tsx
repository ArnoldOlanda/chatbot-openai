import { motion } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
    text: string;
    type: "user" | "assistant";
}

export const MessageBox = ({ type, text }: Props) => {
    const variants = {
        hidden: { opacity: 0, x: type === "assistant" ? -500 : 500 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <>
            <motion.div
                className={`p-3 m-2 rounded-xl inline-block max-w-[80%] md:max-w-[75%] lg:max-w-[70%] ${
                    type === "assistant"
                        ? "bg-[#E8E8E8BF]/75 text-gray-800 self-start"
                        : " bg-gradient-to-br from-[#2432B0] to-[#D10B0B] to-[165%] text-white self-end"
                }`}
                variants={variants}
                // animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                // whileHover={{ scale: 1.1 }}
                // whileTap={{ scale: 0.95 }}
            >
                <Markdown
                    className="w-full overflow-x-auto"
                    remarkPlugins={[remarkGfm]}
                >
                    {text}
                </Markdown>
            </motion.div>
        </>
    );
};
