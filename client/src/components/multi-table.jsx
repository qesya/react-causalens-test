import React, { useEffect, useState } from "react";
import styled from "styled-components";

const colors = [
  "rgba(255, 99, 132, 0.3)",
  "rgba(54, 162, 235, 0.3)",
  "rgba(255, 206, 86, 0.3)",
  "rgba(75, 192, 192, 0.3)",
  "rgba(153, 102, 255, 0.3)",
  "rgba(255, 159, 64, 0.3)",
];

const MultiTable = ({ header, actual, prediction, selected, leftLabel, topLabel }) => {
  const [result, setResult] = useState({
    row1: [0, 0],
    row2: [0, 0],
  });

  useEffect(() => {
    const transformData = () => {
      const counting = prediction.reduce(
        (sum, predict, i) => {
          const actualValue = parseFloat(Number(actual[i][selected]));
          const predictValue = parseFloat(predict.prediction);
          if (actualValue >= 0 && predictValue >= 0) {
            return { ...sum, row1: [sum.row1[0] + 1, sum.row1[1]] };
          }
          if (actualValue < 0 && predictValue >= 0) {
            return { ...sum, row1: [sum.row1[0], sum.row1[1] + 1] };
          }
          if (actualValue >= 0 && predictValue < 0) {
            return { ...sum, row2: [sum.row2[0] + 1, sum.row2[1]] };
          }
          if (actualValue < 0 && predictValue < 0) {
            return { ...sum, row2: [sum.row2[0], sum.row2[1] + 1] };
          }
          return sum;
        },
        { row1: [0, 0], row2: [0, 0] }
      );
      setResult(counting);
    };
    transformData();
  }, [setResult, actual, prediction, selected]);

  return (
    <Container>
      {leftLabel && (
        <ContainerSection justifyContent='center' mt='80px'>
          {leftLabel}
        </ContainerSection>
      )}
      <ContainerSection width='100%'>
        <ContainerSection>{topLabel}</ContainerSection>
        <StyledTable>
          <Row backgroundColor='rgb(0,0,0, 0.5)' color='white'>
            {header.map((column) => (
              <Column key={column} bold flex='1'>
                {column}
              </Column>
            ))}
          </Row>
          {Object.values(result).length > 0 &&
            Object.values(result).map((columns, i) => (
              <Row key={i.toString()} backgroundColor={colors[i % 6]} color='black'>
                <Column flex='1'>{header[i + 1]}</Column>
                {columns.map((column, ii) => (
                  <Column key={`${i}-${ii}`} flex='1'>
                    {column}
                  </Column>
                ))}
              </Row>
            ))}
        </StyledTable>
      </ContainerSection>
    </Container>
  );
};

export default MultiTable;

const Container = styled.div`
  display: flex;
`;

const ContainerSection = styled.div`
  width: ${(p) => p.width};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(p) => p.justifyContent};
  margin-top: ${(p) => p.mt};
`;

const StyledTable = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  background-color: ${(p) => p.backgroundColor};
  color: ${(p) => (p.color ? p.color : "#000000")};
  border-width: 0 1px 1px;
  border-color: #000000;
  border-style: solid;
`;

const Column = styled.div`
  flex: ${(p) => p.flex};
  padding: 25px 10px;
  font-weight: ${(p) => (p.bold ? "bold" : "medium")};
  border-right: 1px solid #000000;

  &:last-child {
    border-right: 0;
  }
`;
