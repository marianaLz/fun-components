import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { twMerge } from "tailwind-merge";

export const GridModalGallery = ({
  srcset = [],
}: {
  srcset: string[];
  children?: ReactNode;
}) => {
  const [current, setCurrent] = useState<number | null>(null);

  return (
    <section className="flex flex-wrap rounded-2xl overflow-hidden">
      {current !== null && (
        <motion.button
          animate={{ backdropFilter: "blur(4px)" }}
          onClick={() => setCurrent(null)}
          className={twMerge("absolute inset-0 bg-purple-200/30")}
        />
      )}
      <AnimatePresence>
        {srcset.map((src, index) => (
          <motion.button key={index} className="w-1/2">
            <motion.img
              layout
              onClick={() => setCurrent(index)}
              role="button"
              src={src}
              alt="demo_1"
              key={index + src}
              className={twMerge(
                " aspect-video cursor-pointer",
                current === index &&
                  "absolute object-cover left-4 w-[94vw] rounded-xl top-20 z-10"
              )}
            />
          </motion.button>
        ))}
      </AnimatePresence>
    </section>
  );
};
