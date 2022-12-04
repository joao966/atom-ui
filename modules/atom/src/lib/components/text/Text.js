import React from "react";
import { string, oneOfType, arrayOf, node, oneOf, bool } from "prop-types";
import styled from "styled-components";

const Span = styled.span`
  color: ${(props) =>
    props.color ? props.color : props.theme.color.neutral[1000]};
`;

const Paragraph = styled.p`
  color: ${(props) =>
    props.color ? props.color : props.theme.color.neutral[1000]};
`;

const Div = styled.div`
  color: ${(props) =>
    props.color ? props.color : props.theme.color.neutral[1000]};
`;

function Text({
  children,
  size = "base",
  emphasys = false,
  type = "div",
  ...props
}) {
  const className = `atom-ui font-size-${size.toLowerCase()}${
    emphasys ? "-emphasys" : ""
  }`;
  const tags = {
    span: (
      <Span className={className} {...props}>
        {children}
      </Span>
    ),
    paragraph: (
      <Paragraph className={className} {...props}>
        {children}
      </Paragraph>
    ),
    div: (
      <Div className={className} {...props}>
        {children}
      </Div>
    ),
  };

  return tags[type] ? tags[type] : React.createElement(type, props, children);
}

Text.propTypes = {
  children: oneOfType([arrayOf(node), node]),
  "aria-label": string,
  size: oneOf(["xl-4", "xl-3", "xl-2", "xl", "lg", "base", "sm", "xs", "xs-2"]),
  emphasys: bool,
  type: oneOf(["div", "span", "paragraph"]),
};

export default Text;
