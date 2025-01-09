import { motion, useAnimationControls, useSpring } from "framer-motion";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "~/lib/utils";

export const Flipper = ({
  children,
  twColor = "white",
}: {
  children?: ReactNode;
  twColor?: string;
}) => {
  const borderColor = `border-${twColor}`;
  const nodes = Children.toArray(children);
  const timeout = useRef<ReturnType<typeof setTimeout>>(null);
  const containerRef = useRef<HTMLElement>(null);
  const prevIndex = useRef(0);
  const nextIndex = useRef(1);

  const flipper = useAnimationControls();
  const [topItem, setTopItem] = useState(nodes[1]);
  const [flipItem, setFlipItem] = useState(nodes[0]);
  const [bottomItem, setBottomItem] = useState(nodes[0]);

  useEffect(() => {
    start();
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNextIndex = (current: number) => (current + 1) % nodes.length;
  const moveIdexesToNext = () => {
    prevIndex.current = getNextIndex(prevIndex.current); // update prev
    nextIndex.current = getNextIndex(prevIndex.current); // update next
  };

  const stop = () => {
    timeout.current && clearTimeout(timeout.current);
  };

  const sleep = (n = 1) => new Promise((r) => setTimeout(r, n * 1000));

  const start = async () => {
    // loop
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(start, 3000);
    // top  flip animation
    await flipper.start({ rotateX: -90 }, { duration: 0.5, ease: "easeIn" });
    // next
    moveIdexesToNext();
    setFlipItem(nodes[prevIndex.current]);
    flipper.set({ rotateX: -270 });
    await flipper.start({ rotateX: -360 }, { duration: 0.5, ease: "easeOut" });
    setTopItem(nodes[nextIndex.current]);
    setBottomItem(nodes[prevIndex.current]);
    flipper.set({ rotateX: 0 });
  };

  const z1 = useSpring(0, { bounce: 0 });
  const z2 = useSpring(0, { bounce: 0 });
  const rotateY = useSpring(-20, { bounce: 0 });
  const rotateX = useSpring(0, { bounce: 0 });

  return (
    <motion.section
      ref={containerRef}
      className={cn(
        "p-0 rounded-3xl aspect-video bg-white dark:bg-dark relative w-[420px] h-[320px]"
      )}
      style={{
        // perspective: 5000,
        transformStyle: "preserve-3d",
        rotateY,
        rotateX,
      }}
    >
      <motion.div
        style={{
          z: z1,
        }}
        className=" overflow-hidden rounded-2xl absolute inset-12 z-0"
      >
        {topItem}
      </motion.div>
      <motion.div
        animate={flipper}
        className="absolute inset-12 z-20 overflow-hidden rounded-2xl"
      >
        {flipItem}
      </motion.div>
      <motion.div
        style={{
          z: z2,
          // 🪄
          clipPath: "polygon(0px 50%, 100% 50%, 100% 100%, 0px 100%)",
        }}
        className="absolute inset-12 z-10 overflow-hidden rounded-2xl"
      >
        {bottomItem}
      </motion.div>
      <hr
        className={cn(
          "w-full absolute border !border-white dark:!border-dark border-px top-[49.9%] z-30 left-0",
          borderColor
        )}
      />
    </motion.section>
  );
};
