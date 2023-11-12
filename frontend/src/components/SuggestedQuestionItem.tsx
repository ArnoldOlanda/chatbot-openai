import { motion } from "framer-motion";
export const SuggestedQuestionItem = () => {
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="p-1 pl-2 pr-2 bg-white mr-2 rounded-3xl border-blue-800 border-2 text-xs"
            variants={variants}
            transition={{ duration: 1 }}
        >
            SuggestedQuestionItem
        </motion.div>
    );
};
