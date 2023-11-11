import { motion } from "framer-motion";

interface Props {
    text: string;
    type: "user" | "assistant";
}

export const MessageBox = ({ type, text }: Props) => {
    return (
        <>
            <motion.div
                className={`p-3 m-2 rounded-xl inline-block ${
                    type === "assistant"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-800"
                }`}
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                // whileHover={{ scale: 1.1 }}
                // whileTap={{ scale: 0.95 }}
            >
                <span>{text}</span>
            </motion.div>
        </>
    );
};
