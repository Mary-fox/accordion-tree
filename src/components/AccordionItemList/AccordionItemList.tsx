import React from "react";
import { AccordionData } from "../AccordionItem/AccordionItem";
import AccordionItem from "../AccordionItem/AccordionItem";
import "./AccordionItemList.css";

interface AccordionItemListProps {
  data: AccordionData[];
  handleToggle: (id: number) => void;
  level?: number;
}

const AccordionItemList: React.FC<AccordionItemListProps> = ({
  data,
  handleToggle,
  level = 0,
}) => {
  return (
    <div className="accordion__list">
      {data.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          handleToggle={handleToggle}
          level={level}
        >
          <AccordionItemList
            data={item.children}
            level={level + 1}
            handleToggle={handleToggle}
          />
        </AccordionItem>
      ))}
    </div>
  );
};

export default React.memo(AccordionItemList);
