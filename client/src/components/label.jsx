import React from 'react';
import styled from 'styled-components';


const Label = ({ children, ...props}) => (
  <StyledLabel {...props}>{children}</StyledLabel>
)

export default Label;

const StyledLabel = styled.label`
  font-family: Arial;
  margin-bottom: 10px;
`