import React from "react";
import { AccordionData } from "../AccordionItem/AccordionItem";
import AccordionItem from "../AccordionItem/AccordionItem";
import styled from "styled-components";

interface AccordionItemListProps {
  data: AccordionData[];
  handleToggle: (id: number) => void;
  level?: number;
}

const AccordionListStyle = styled.ul`
  padding: 0;
`;

const AccordionItemList: React.FC<AccordionItemListProps> = ({
  data,
  handleToggle,
  level = 0,
}) => {
  return (
    <AccordionListStyle>
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
    </AccordionListStyle>
  );
};

export default React.memo(AccordionItemList);
