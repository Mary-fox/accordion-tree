import React from "react";
import styled from "styled-components";
// import "./AccordionItem.css";

export interface AccordionData {
  id: number;
  title: string;
  open: boolean;
  children: AccordionData[];
}

interface AccordionItemProps {
  item: AccordionData;
  handleToggle: (id: number) => void;
  children?: React.ReactNode; // Используем React.ReactNode для дочерних элементов
}

const Item = styled.div`
  display: flex;
  cursor: pointer;
  color: aliceblue;
  gap: 10px;
`;
const ItemWrapper = styled.div`
  padding: 10px;
  border: 1px solid aliceblue;
`;

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  handleToggle,
  children,
}) => {
  return (
    <ItemWrapper>
      <Item onClick={() => handleToggle(item.id)}>
        <span>{item.open ? "v" : ">"}</span>
        <div>{item.title}</div>
      </Item>
      {item.open && item.children.length > 0 && (
        <div>
          {/* Передаем children внутрь компонента */}
          {children}
        </div>
      )}
    </ItemWrapper>
  );
};
export default React.memo(AccordionItem, (prevProps, nextProps) => {
  if (prevProps.item.open !== nextProps.item.open) {
    return false; // Если свойство `open` изменилось, перерисовываем компонент
  }

  // Дополнительно проверяем дочерние элементы на изменения
  const prevChildren = prevProps.item.children;
  const nextChildren = nextProps.item.children;
  for (let i = 0; i < prevChildren.length; i++) {
    if (prevChildren[i].open !== nextChildren[i].open) {
      return false; // Если свойство `open` у дочерних элементов изменилось, перерисовываем компонент
    }
  }

  return true; // Если ни одно из свойств не изменилось, не перерисовываем компонент
});
