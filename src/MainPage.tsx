import React from "react";
import "./MainPage.css";
import Accordion from "./components/Accordion/Accordion";
import treeData from "./datas/data";

const MainPage: React.FC = () => {
  return (
    <div className="wrapper">
      <Accordion data={treeData} />
    </div>
  );
};

export default MainPage;
