import React from "react";
import Accordion from "./components/Accordion/Accordion";
import treeData from "./datas/data";
import styled from "styled-components";

const MainWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;
const MainPage = () => {
  return (
    <MainWrapper>
      <Accordion data={treeData} />
    </MainWrapper>
  );
};

export default MainPage;
