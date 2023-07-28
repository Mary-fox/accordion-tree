import { AccordionData } from "../datas/data";

export function toggleChildren(data: AccordionData[], id: number): AccordionData[] {
  return data.map((item) => {
    if (item.id === id) {
      return { ...item, open: !item.open };
    } else if (item.children.length) {
      return { ...item, children: toggleChildren(item.children, id) };
    }
    return item;
  });
}

export function filterAccordion(data: AccordionData[], searchInput: string): AccordionData[] {
  return data.map((item) => {
    const isOpen =
      item.title.toUpperCase().includes(searchInput.toUpperCase()) ||
      item.children.some((child) => child.open);
    const children = filterAccordion(item.children, searchInput);
    const open = isOpen || children.some((child) => child.open);

    return { ...item, open, children };
  });
}