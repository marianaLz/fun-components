import { RefObject, useEffect, useState } from "react";

export const useMeasure = (ref: RefObject<HTMLElement>) => {
  const [state, setState] = useState<DOMRect>({});

  const setMeasure = (node: HTMLElement) => {
    setState(node.getBoundingClientRect());
  };

  useEffect(() => {
    if (ref?.current) {
      setMeasure(ref.current);
    }
  }, [ref]);

  return state;
};
