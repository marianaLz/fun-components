import {
  useMotionValueEvent,
  useScroll,
  motion,
  useTransform,
  useAnimationControls,
} from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

export const ScrollCounter = () => {
  const [number, setNumber] = useState(1);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: targetRef,
  });
  //   const n = useSpring(scrollYProgress);
  const controls = useAnimationControls();
  const imgControls = useAnimationControls();

  const n = useTransform(scrollYProgress, [0.15, 1], [1, 5]);

  const handleNumberUpdate = (n: number) => {
    if (Math.ceil(n) !== number) {
      setNumber(Math.ceil(n));
    }
  };

  // number animation
  useEffect(() => {
    const animation = async () => {
      await controls.start({ scale: 1, opacity: 0, y: 10 });
      if (document?.querySelector) {
        const node = document.querySelector("#number");
        if (node) {
          node.textContent = `${number}`;
        }
      }
      await controls.start(
        { scale: 1, opacity: 0, y: -10 },
        { duration: 0.01 }
      );
      await controls.start(
        { scale: 1.1, opacity: 1, y: 0 },
        { type: "spring" }
      );
    };
    animation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  // cellphone animation
  useEffect(() => {
    const animation = async () => {
      // exit
      await imgControls.start(
        { opacity: 0, rotate: -45, x: "-50vw" },
        { type: "spring", duration: 1 }
      );
      // reset
      await imgControls.start(
        { opacity: 0, rotate: 45, x: "50vw" },
        { duration: 0.1 }
      );
      //enter
      //   imgControls.stop();
      await imgControls.start(
        { opacity: 1, rotate: 0, x: 0 },
        { type: "spring", bounce: 0.4 }
      );
    };
    animation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    handleNumberUpdate(n.get());
  });

  return (
    <article className="relative overflow-hidden">
      <section className="justify-center flex px-4 w-full h-screen">
        <motion.span
          id="number"
          className="text-[100vh] font-mono font-bold text-indigo-100 lg:ml-[14%] ml-[18%] left-0 -z-10 absolute top-[-100px]"
          animate={controls}
        >
          1
        </motion.span>
        <div
          className="scroller overflow-auto md:min-w-max md:pl-20 lg:pl-0"
          ref={targetRef}
        >
          <TextGroups />
        </div>

        <motion.img
          animate={imgControls}
          className="self-center h-[80vh] hidden md:block"
          src="https://i.imgur.com/qBewgS0.png"
          alt="phone"
        />
      </section>
    </article>
  );
};

const TextGroup = ({ title, text }: { title: ReactNode; text: ReactNode }) => {
  return (
    <p className="text-5xl font-bold h-screen grid place-content-center max-w-sm text-center px-2">
      {title}
      <div className="text-2xl font-thin mt-4"> {text}</div>
    </p>
  );
};

const TextGroups = () => {
  return (
    <>
      <TextGroup
        text={
          <span className="text-2xl font-normal tracking-wide line-clamp-2">
            No pierdas tiempo llenando formularios
          </span>
        }
        title={
          <p>
            Inicia sesión con Google{" "}
            <span className="text-indigo-500">rápido</span>
          </p>
        }
      />
      <TextGroup
        text={
          <span>
            Puedes personalizar Formmy para que sea igual a tu sitio web
          </span>
        }
        title={
          <p>
            Selecciona tus campos{" "}
            <span className="text-indigo-500">y colores</span>
          </p>
        }
      />
      <TextGroup
        text={<span>Puedes hacer que llueva confeti 🎉</span>}
        title={
          <p>
            Selecciona tu mensaje y{" "}
            <span className="text-indigo-500">un emoji</span>
          </p>
        }
      />
      <TextGroup
        text={<span>Copia y pega el código HTML en tu sitio web</span>}
        title={
          <p>
            Usa tu Formmy en{" "}
            <span className="text-indigo-500">tu sitio web</span>
          </p>
        }
      />
      <TextGroup
        text={<span>Administra tus mensajes y contactos</span>}
        title={
          <p>
            ¡Recibe mensajes al{" "}
            <span className="text-indigo-500">instante!</span>
          </p>
        }
      />
    </>
  );
};
