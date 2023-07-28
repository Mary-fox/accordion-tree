import React, { useState, useCallback } from "react";
import { AccordionData } from "../../datas/data";
import AccordionItemList from "../AccordionItemList/AccordionItemList";
import {
  toggleChildren,
  filterAccordion,
} from "../../helpers/accordionHelpers";
import styled from "styled-components";

interface AccordionProps {
  data: AccordionData[];
}

const AccordionBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  gap: 10px;
`;
const Search = styled.input`
  width: 500px;
`;

const Accordion: React.FC<AccordionProps> = ({ data }) => {
  const [accordionData, setAccordionData] = useState<AccordionData[]>(data);
  const [searchInput, setSearchInput] = useState<string>("");

  const handleToggle = useCallback((id: number) => {
    setAccordionData((prevData) => toggleChildren(prevData, id));
  }, []);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value.toUpperCase();
      setSearchInput(search);
      if (search === "") {
        setAccordionData(data);
      } else setAccordionData(filterAccordion(accordionData, search));
    },
    [data, filterAccordion, accordionData],
  );

  return (
    <AccordionBlock>
      <Search
        type="text"
        value={searchInput}
        onChange={handleSearch}
        className="search"
      />
      <AccordionItemList data={accordionData} handleToggle={handleToggle} />
    </AccordionBlock>
  );
};

export default Accordion;
