import React, { useState } from "react";
import { AccordionData } from "../AccordionItem/AccordionItem";
import AccordionItemList from "../AccordionItemList/AccordionItemList";
import "./Accordion.css";

interface AccordionProps {
  data: AccordionData[];
}

const Accordion: React.FC<AccordionProps> = ({ data }) => {
  const [accordionData, setAccordionData] = useState<AccordionData[]>(data);
  const [searchInput, setSearchInput] = useState<string>("");

  //обновляем состояние каждого элемента
  const handleToggle = (id: number) => {
    setAccordionData((prevData) => {
      return prevData.map((item) => {
        if (item.id === id) {
          return { ...item, open: !item.open };
        } else if (item.children.length > 0) {
          return { ...item, children: toggleChildren(item.children, id) };
        }
        return item;
      });
    });
  };
  //обновляем состояние дочерних элементов (children)
  const toggleChildren = (
    children: AccordionData[],
    id: number,
  ): AccordionData[] => {
    return children.map((item) => {
      if (item.id === id) {
        return { ...item, open: !item.open };
      } else if (item.children.length > 0) {
        return { ...item, children: toggleChildren(item.children, id) };
      }
      return item;
    });
  };

  const filterAccordion = (
    data: AccordionData[],
    searchInput: string,
    openParents: number[] = [], // массив открытых родителей
  ): AccordionData[] => {
    return data.map((item) => {
      const isOpen =
        openParents.includes(item.id) ||
        item.title.toUpperCase().includes(searchInput.toUpperCase());
      const children = filterAccordion(
        item.children,
        searchInput,
        isOpen ? [...openParents, item.id] : openParents, // передаем массив с id открытых родителей
      );
      const open = isOpen || children.some((child) => child.open);

      return { ...item, open, children };
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.toUpperCase();
    setSearchInput(search);
    if (search === "") {
      setAccordionData(data);
    } else setAccordionData(filterAccordion(data, search));
  };

  return (
    <div className="accordion">
      <input
        type="text"
        value={searchInput}
        onChange={handleSearch}
        className="search"
      />
      <AccordionItemList data={accordionData} handleToggle={handleToggle} />
    </div>
  );
};

export default Accordion;
