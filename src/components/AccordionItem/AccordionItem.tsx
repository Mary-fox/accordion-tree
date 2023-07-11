import React from "react";
import "./AccordionItem.css";

export interface AccordionData {
  id: number;
  title: string;
  open: boolean;
  children: AccordionData[];
}

interface AccordionItemProps {
  item: AccordionData;
  handleToggle: (id: number) => void;
  level: number;
  children?: React.ReactNode; // Используем React.ReactNode для дочерних элементов
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  handleToggle,
  level,
  children,
}) => {
  const itemPadding = level * 10; // Рассчитываем отступ на основе глубины вложенности

  return (
    <div>
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
          {/* Передаем children внутрь компонента */}
          {children}
        </div>
      )}
    </div>
  );
};
export default React.memo(AccordionItem, (prevProps, nextProps) => {
  return prevProps.item.open === nextProps.item.open;
});
