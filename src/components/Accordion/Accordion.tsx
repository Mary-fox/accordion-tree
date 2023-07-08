import React, { useState } from "react";
import { TreeData } from "../AccordionItemList/AccordionItemList";
import AccordionItemList from "../AccordionItemList/AccordionItemList";
import "./Accordion.css";
interface AccordionProps {
  data: TreeData[];
}

const Accordion: React.FC<AccordionProps> = ({ data }) => {
  const [treeData, setTreeData] = useState(data);

  //обновляем состояние каждого элемента
  const handleToggle = (id: number) => {
    setTreeData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return { ...item, open: !item.open };
        } else if (item.children.length > 0) {
          return { ...item, children: toggleChildren(item.children, id) };
        }
        return item;
      });
    });
  };
  //обновляем состояние дочерних элементов (children)
  const toggleChildren = (children: TreeData[], id: number): TreeData[] => {
    return children.map((item) => {
      if (item.id === id) {
        return { ...item, open: !item.open };
      } else if (item.children.length > 0) {
        return { ...item, children: toggleChildren(item.children, id) };
      }
      return item;
    });
  };

  return (
    <div className="accordion">
      <AccordionItemList data={treeData} handleToggle={handleToggle} />
    </div>
  );
};

export default Accordion;
