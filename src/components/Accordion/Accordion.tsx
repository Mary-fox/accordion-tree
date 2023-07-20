import React, { useState, useCallback } from "react";
import { AccordionData } from "../../datas/data";
import AccordionItemList from "../AccordionItemList/AccordionItemList";
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

  // обновляем состояние каждого элемента
  const handleToggle = useCallback((id: number) => {
    setAccordionData((prevData) => {
      const toggleChildren = (data: AccordionData[]): AccordionData[] => {
        return data.map((item) => {
          if (item.id === id) {
            return { ...item, open: !item.open };
          } else if (item.children.length) {
            return { ...item, children: toggleChildren(item.children) };
          }
          return item;
        });
      };

      return toggleChildren(prevData);
      //Возвращаем новое состояние, обновленное функцией toggleChildren
    });
  }, []);

  const filterAccordion = useCallback(
    (data: AccordionData[], searchInput: string): AccordionData[] => {
      return data.map((item) => {
        const isOpen =
          item.title.toUpperCase().includes(searchInput.toUpperCase()) ||
          item.children.some((child) => child.open);
        const children = filterAccordion(item.children, searchInput);
        const open = isOpen || children.some((child) => child.open);

        return { ...item, open, children };
      });
    },
    [],
  );

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
