import React from "react";
import { AccordionData } from "../../datas/data";
import AccordionItem from "../AccordionItem/AccordionItem";
import styled from "styled-components";

interface AccordionItemListProps {
  data: AccordionData[];
  handleToggle: (id: number) => void;
}

const AccordionListStyle = styled.ul`
  padding: 0;
`;

const AccordionItemList: React.FC<AccordionItemListProps> = ({
  data,
  handleToggle,
}) => {
  return (
    <AccordionListStyle>
      {data.map((item) => (
        <AccordionItem key={item.id} item={item} handleToggle={handleToggle}>
          <AccordionItemList data={item.children} handleToggle={handleToggle} />
        </AccordionItem>
      ))}
    </AccordionListStyle>
  );
};

export default AccordionItemList;
