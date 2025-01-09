import { Reorder } from "motion/react";
import { useState } from "react";

export function SuperSimpleDraggableList({ items = [] }: { items?: string[] }) {
  const [list, setList] = useState(items);
  return (
    <Reorder.Group
      onReorder={setList}
      values={list}
      className="flex flex-col justify-center items-center gap-1"
    >
      {list.map((item) => (
        <Reorder.Item key={item} value={item}>
          <li className="text-6xl p-1 bg-indigo-500 rounded-full w-20 h-20 flex items-center justify-center">
            {item}
          </li>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
