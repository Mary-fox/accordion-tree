import React from "react";
import "./AccordionItemList.css";

export interface TreeData {
  id: number;
  title: string;
  open: boolean;
  children: TreeData[];
}
interface AccordionItemListProps {
  data: TreeData[];
  handleToggle: (id: number) => void;
}

const AccordionItemList: React.FC<AccordionItemListProps> = ({
  data,
  handleToggle,
}) => {
  return (
    <div className="accordion__list">
      {data.map((item) => (
        <div key={item.id}>
          <div className="item" onClick={() => handleToggle(item.id)}>
            <div className="item__icon">{item.open ? "v" : ">"}</div>
            <div className="item__title">{item.title}</div>
          </div>
          {item.open && item.children.length > 0 && (
            <div className="children-container">
              <AccordionItemList
                data={item.children}
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
