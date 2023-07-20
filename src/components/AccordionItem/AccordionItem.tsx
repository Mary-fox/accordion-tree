import React from "react";
import { AccordionData } from "../../datas/data";
import styled from "styled-components";

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
const rerenderChildren = (
  prevChildren: AccordionData[],
  nextChildren: AccordionData[],
) => {
  if (prevChildren.length !== nextChildren.length) {
    return false; // Если количество дочерних элементов изменилось, перерисовываем компонент
  }

  for (let i = 0; i < prevChildren.length; i++) {
    if (prevChildren[i].open !== nextChildren[i].open) {
      return false; // Если свойство `open` любого из дочерних элементов изменилось, перерисовываем компонент
    }

    if (prevChildren[i].children.length && nextChildren[i].children.length) {
      const equalityPropertiesChildren = rerenderChildren(
        prevChildren[i].children,
        nextChildren[i].children,
      );

      if (!equalityPropertiesChildren) {
        return false; // Если какой-либо из вложенных дочерних элементов изменился, перерисовываем компонент
      }
    }
  }

  return true;
};

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
  if (
    prevProps.item.open !== nextProps.item.open ||
    prevProps.item.title !== nextProps.item.title
  ) {
    return false; // Если свойство `open` или `title` изменилось, перерисовываем компонент
  }
  return rerenderChildren(prevProps.item.children, nextProps.item.children);
});
