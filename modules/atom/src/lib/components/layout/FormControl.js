import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";

const CustomFormControl = styled.div`
  .ant-form-item {
    margin-bottom: 18px;
  }
`;
const FormControl = ({
  sm,
  xs = 24,
  md = 12,
  fullWidth = false,
  children,
  gutter = 16,
  ...props
}) => {
  const listFields = (children) =>
    React.Children.map(children, (field, i) => {

      return (
        <Col
          key={`${field.props.name}-${i}`}
          xs={xs}
          sm={sm}
          md={fullWidth ? 24 : md}
        >
          {field}
        </Col>
      );
    });

  return (
    <CustomFormControl {...props}>
      <Row gutter={gutter}>{listFields(children)}</Row>
    </CustomFormControl>
  );
};

export default FormControl;
