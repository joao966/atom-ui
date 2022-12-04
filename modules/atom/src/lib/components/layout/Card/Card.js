import React from 'react'
import styled from 'styled-components'

const CardContainer = styled.div`
  width: 100%;
  background: ${props => props.theme.color.white};
  display: ${props => props.display || ''};
  align-items: ${props => props.alignItems || ''};
  flex-direction: ${props => props.direction || ''};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
  border-radius: 8px;
  margin: 10px;
  padding: 24px;
  overflow: hidden;
`;

const CardDivider = styled.div`
  margin: 16px 0px; 
  border-bottom: 1px solid ${props => props.theme.color.neutral[300]};
    
`;
const Card = ({ children, ...props }) => {
  return (
    <CardContainer {...props}>
      {children}
    </CardContainer>
  );
};

Card.Divider = CardDivider;

export default Card;
