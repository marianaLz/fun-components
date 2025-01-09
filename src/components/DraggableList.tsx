import { Reorder } from "motion/react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const DraggableList = ({ items = [] }: { items: string[] }) => {
  const [list, setList] = useState<string[]>(items);
  const [currentGrabbing, setCurrentGrabbing] = useState<string | null>(null);

  return (
    <>
      <Reorder.Group onReorder={setList} values={list}>
        <ul className="flex flex-col gap-3">
          {list.map((text) => (
            <Reorder.Item
              onDragStart={() => setCurrentGrabbing(text)}
              onDragEnd={() => setCurrentGrabbing(null)}
              key={text}
              value={text}
              whileDrag={{ scale: 1.1 }}
            >
              <p
                className={twMerge(
                  "cursor-grab py-2 px-8 bg-pink-500 rounded-3xl",
                  currentGrabbing === text && "bg-pink-600 cursor-grabbing"
                )}
              >
                <span className="text-2xl text-white font-bold tracking-wider">
                  {" "}
                  {text}
                </span>
              </p>
            </Reorder.Item>
          ))}
        </ul>
      </Reorder.Group>
      <button
        onClick={() => console.log("ORDER:", list)}
        className="w-full my-8 py-2 font-bold bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 rounded-3xl"
      >
        Guardar
      </button>
    </>
  );
};
