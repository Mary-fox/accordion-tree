import { AccordionData } from "../components/AccordionItem/AccordionItem";
const treeData:  AccordionData[] = [
    {
      id: 1,
      title: "Очень интересный заголовок под номером 1",
      open: false,
      children: [],
    },
    {
      id: 2,
      title: "А это уже заголовок под номером 2",
      open: false,
      children: [
        {
          id: 3,
          title: "Подзаголовок, лежаший в заголовке 2",
          open: false,
          children: [],
        },
        {
          id: 4,
          title: "Подзаголовок 2, лежаший в заголовке 2",
          open: false,
          children: [],
        },
      ],
    },
    {
      id: 5,
      title: "Заголовок №3",
      open: false,
      children: [
        {
          id: 6,
          title: "Подзаголовок здесь будет под номером 99 ",
          open: false,
          children: [
            {
              id: 7,
              title: "А тут 50",
              open: false,
              children: [],
            },
          ],
        },
      ],
    },
  ];
  export default treeData;