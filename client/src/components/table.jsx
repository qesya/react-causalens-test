import React from 'react';
import styled from 'styled-components';


const colors = [
  'rgba(255, 99, 132, 0.3)',
  'rgba(54, 162, 235, 0.3)',
  'rgba(255, 206, 86, 0.3)',
  'rgba(75, 192, 192, 0.3)',
  'rgba(153, 102, 255, 0.3)',
  'rgba(255, 159, 64, 0.3)',
];

const Table = ({ header, data }) => {
  const transformData = () => {
    if (!data) return;
    const resultData = data ? Object.entries(data) : [];
    return resultData
  }

  return (
    <StyledTable>
      <Row backgroundColor="rgb(0,0,0, 0.5)" color="white">
        {header.map(column => (
          <Column key={column} bold flex="1">{column}</Column>            
        ))}
      </Row>
      {data && transformData().map((columns, i) => (
        <Row key={i.toString()} backgroundColor={colors[i % 6]} color="black">
          {columns.map(column => (
            <Column key={column} flex="1">{column}</Column>            
          ))}
        </Row>
      ))}
    </StyledTable>
  )
}

export default Table;


const StyledTable = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  background-color: ${p => p.backgroundColor};
  color: ${p => p.color ? p.color : '#000000'};
  border-width: 0 1px 1px;
  border-color: #000000;
  border-style: solid;
`
  
const Column = styled.div`
  flex: ${p => p.flex};
  padding: 15px 10px;
  font-weight: ${p => p.bold ? 'bold' : 'medium'};
  border-right: 1px solid #000000;

  &:last-child {
    border-right: 0;
  }
`