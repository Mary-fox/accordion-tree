import React from "react";
import "./AccordionItemList.css";

export interface AccordionData {
  id: number;
  title: string;
  open: boolean;
  children: AccordionData[];
}
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
  const itemPadding = level * 10; // Рассчитываем отступ на основе глубины вложенности
  return (
    <div className="accordion__list">
      {data.map((item) => (
        <div key={item.id}>
          <div
            className="item"
            onClick={() => handleToggle(item.id)}
            style={{ paddingLeft: `${itemPadding}px` }}
          >
            <span className="item__icon">{item.open ? "v" : ">"}</span>
            <div className="item__title">{item.title}</div>
          </div>
          {item.open && item.children.length > 0 && (
            <div className="children-container">
              <AccordionItemList
                data={item.children}
                level={level + 1}
                handleToggle={handleToggle}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccordionItemList;
