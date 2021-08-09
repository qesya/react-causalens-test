import React from 'react';
import styled from 'styled-components';

const Select = ({ items, itemId, itemLabel, ...props }) => {

  return (
    <StyledSelect {...props}>
      {items.map((item) => (
        <option key={item.toString()} value={itemId ? item[itemId] : item}>{itemLabel ? item[itemLabel] : item}</option>
      ))}
    </StyledSelect>
  )
}

export default Select;

const StyledSelect = styled.select`
  position: relative;
`

