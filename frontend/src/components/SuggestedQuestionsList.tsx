import { SuggestedQuestionItem } from "./SuggestedQuestionItem";
import { Variants, motion } from "framer-motion";

export const SuggestedQuestionsList = () => {
    const list: Variants = {
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
                delayChildren: 0.8,
                staggerChildren: 0.2,
            },
        },
        hidden: {
            opacity: 0,
        },
    };

    return (
        <motion.div
            className=" flex w-[100%] md:w-[70%] lg:w-[50%] justify-end mb-2 mt-2 box-border z-0"
            initial="hidden"
            animate="visible"
            variants={list}
        >
            {[1, 2, 3].map((item) => (
                <SuggestedQuestionItem key={item} />
            ))}
        </motion.div>
    );
};
