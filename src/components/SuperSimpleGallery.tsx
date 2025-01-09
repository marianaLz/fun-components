import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const SuperSimpleGallery = ({ srcset = [] }: { srcset?: string[] }) => {
  const [index, setIndex] = useState(0);
  const updateIndex = () => setIndex((i) => (i + 1) % srcset.length);
  return (
    <AnimatePresence mode="popLayout">
      <button
        onClick={updateIndex}
        className="text-4xl py-2 px-6 rounded-xl font-bold bg-orange-500 my-10 active:scale-95 transition-all"
      >
        Update
      </button>
      <motion.img
        key={srcset[index]}
        src={srcset[index]}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
      />
    </AnimatePresence>
  );
};
