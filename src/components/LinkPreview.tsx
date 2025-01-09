import { useSpring, motion } from "motion/react";
import { MouseEvent, ReactNode, useRef } from "react";

export const LinkPreview = ({
  children,
  src,
  href,
}: {
  href?: string;
  children?: ReactNode;
  className?: string;
  src?: string;
}) => {
  const textRef = useRef<HTMLAnchorElement>(null);
  const x = useSpring(-24);

  const handleMouseOver = (event: MouseEvent<HTMLDivElement>) => {
    x.set(event.clientX / 4);
  };
  const opacity = useSpring(0, { bounce: 0, duration: 300 });
  const scale = useSpring(0.5, { bounce: 0.4 });

  const handleMouseEnter = () => {
    scale.set(1);
    opacity.set(1);
  };
  const handleMouseLeave = () => {
    scale.set(0.5);
    opacity.set(0);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      //   ref={scope}
      className="relative inline-block"
      onMouseMove={handleMouseOver}
    >
      <a
        href={href}
        rel="noreferrer"
        target="_blank"
        ref={textRef}
        className="text-gray-700 font-bold hover:underline "
      >
        {children}
      </a>

      <motion.img
        className="rounded-2xl border-4 border-[#5158f6] absolute bottom-6 -left-6 w-40"
        src={src}
        alt="preview"
        style={{
          x,
          scale,
          opacity,
          transformOrigin: "bottom",
        }}
      />
    </div>
  );
};
