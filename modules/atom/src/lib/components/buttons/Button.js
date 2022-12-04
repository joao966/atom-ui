import { Button as AntdButton } from "antd";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import cn from "classnames";

const CustomButton = styled(AntdButton)`
  &.ant-btn {
    font-size: 16px;
    border-radius: 4px;
    padding: 2px 8px;
    height: 32px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    color: ${(props) => {
      return props.textcolor ? props.textcolor : props.theme.color.white;
    }};
    background: ${(props) => props.theme.color.brand.primary};
    border-color: ${(props) => props.theme.color.brand.primary};
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0px 0px;
  }

  &.ant-btn-sm {
    padding: 2px 8px;
    height: 24px;
    font-size: 14px;
    line-height: 18px;
  }

  &.ant-btn-lg {
    line-height: 22px;
    padding: 8px 16px;
    height: 40px;
  }

  &.ant-btn.btn-brand-secondary {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.white};
    background: ${(props) => props.theme.color.brand.secondary};
    border-color: ${(props) => props.theme.color.brand.secondary};
  }

  &.ant-btn.ant-btn-custom-color {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.white};
    background: ${(props) => props.color};
    border-color: ${(props) => props.color};
  }

  &&.ant-btn.dashed-brand-secondary {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.brand.secondary};
    background: ${(props) => props.theme.color.white};
    border-color: ${(props) => props.theme.color.brand.secondary};
  }

  &&.ant-btn.dashed-brand-secondary:hover,
  &&.ant-btn.dashed-brand-secondary:focus {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.bright.blue};
    background: ${(props) => props.theme.color.white};
    border-color: ${(props) => props.theme.color.bright.blue};
  }

  &.ant-btn.ant-btn-custom-color:hover,
  &.ant-btn.ant-btn-custom-color:focus {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.white};
    background: ${(props) => props.color};
    border-color: ${(props) => props.color};
    opacity: 0.6;
  }

  &&.ant-btn.link-brand-secondary {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.brand.secondary};
    background: transparent;
    border-color: transparent;
  }

  &&.ant-btn.link-brand-secondary:hover,
  &&.ant-btn.link-brand-secondary:focus {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.bright.blue};
    background: transparent;
    border-color: transparent;
  }

  &.ant-btn.btn-brand-secondary:hover,
  &.ant-btn.btn-brand-secondary:focus {
    background: ${(props) => props.theme.color.bright.blue};
    border-color: ${(props) => props.theme.color.bright.blue};
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.white};
  }

  &.ant-btn.btn-brand-secondary[disabled],
  &.ant-btn.btn-brand-secondary[disabled]:hover {
    color: ${(props) => props.theme.color.white};
    background: ${(props) => props.theme.color.neutral[300]};
    border-color: ${(props) => props.theme.color.neutral[300]};
  }

  &.ant-btn.ant-btn-secondary {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.brand.primary};
    background: ${(props) => props.theme.color.white};
    border-color: ${(props) => props.theme.color.brand.primary};
  }

  &.ant-btn.ant-btn-secondary[disabled],
  &.ant-btn.ant-btn-secondary[disabled]:hover {
    color: ${(props) => props.theme.color.neutral[300]};
    background: ${(props) => props.theme.color.white};
    border-color: ${(props) => props.theme.color.neutral[300]};
  }

  &.ant-btn.ant-btn-secondary:hover,
  &.ant-btn.ant-btn-secondary:focus {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.bright.orange};
    background: ${(props) => props.theme.color.white};
    border-color: ${(props) => props.theme.color.bright.orange};
  }

  &.ant-btn.ant-btn-success {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.white};
    background: ${(props) => props.theme.color.functional.success};
    border-color: ${(props) => props.theme.color.functional.success};
  }

  &.ant-btn.ant-btn-success[disabled],
  &.ant-btn.ant-btn-success[disabled]:hover {
    color: ${(props) => props.theme.color.neutral[300]};
    background: ${(props) => props.theme.color.white};
    border-color: ${(props) => props.theme.color.neutral[300]};
  }

  &.ant-btn.ant-btn-success:hover,
  &.ant-btn.ant-btn-success:focus {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.white};
    background: ${(props) => props.theme.color.functional.grayish.success};
    border-color: ${(props) => props.theme.color.functional.grayish.success};
  }

  &.ant-btn.ant-btn-error {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.white};
    background: ${(props) => props.theme.color.functional.error};
    border-color: ${(props) => props.theme.color.functional.error};
  }

  &.ant-btn.ant-btn-error[disabled],
  &.ant-btn.ant-btn-error[disabled]:hover {
    color: ${(props) => props.theme.color.neutral[300]};
    background: ${(props) => props.theme.color.white};
    border-color: ${(props) => props.theme.color.neutral[300]};
  }

  &.ant-btn.ant-btn-error:hover,
  &.ant-btn.ant-btn-error:focus {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.white};
    background: ${(props) => props.theme.color.functional.grayish.error};
    border-color: ${(props) => props.theme.color.functional.grayish.error};
  }

  &.ant-btn.ant-btn-dashed {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.brand.primary};
    background: ${(props) => props.theme.color.white};
    border-color: ${(props) => props.theme.color.brand.primary};
    border-style: dashed;
  }

  &.ant-btn.ant-btn-dashed[disabled],
  &.ant-btn.ant-btn-dashed[disabled]:hover {
    color: ${(props) => props.theme.color.neutral[300]};
    background: ${(props) => props.theme.color.white};
    border-color: ${(props) => props.theme.color.neutral[300]};
    border-style: dashed;
  }

  &.ant-btn.ant-btn-dashed:hover,
  &.ant-btn.ant-btn-dashed:focus {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.bright.orange};
    background: ${(props) => props.theme.color.white};
    border-color: ${(props) => props.theme.color.bright.orange};
    border-style: dashed;
  }

  &.ant-btn.ant-btn-link:hover {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.bright.orange};
    background: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  &.ant-btn.ant-btn-link[disabled],
  &.ant-btn.ant-btn-link[disabled]:hover {
    color: ${(props) => props.theme.color.neutral[300]};
    background: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  &.ant-btn.ant-btn-link,
  &.ant-btn.ant-btn-link:focus {
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.brand.primary};
    background: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  &.ant-btn[disabled],
  &.ant-btn[disabled]:hover {
    box-shadow: none;

    box-sizing: border-box;
    border-radius: 4px;

    background: ${(props) => props.theme.color.neutral[300]};
    border: 1px solid ${(props) => props.theme.color.neutral[300]};
    color: ${(props) => props.theme.color.white};
  }

  &.ant-btn-primary:hover,
  &.ant-btn-primary:focus,
  &.ant-btn:hover,
  &.ant-btn:focus {
    background: ${(props) => props.theme.color.brand.secondary};
    color: ${(props) =>
      props.textcolor ? props.textcolor : props.theme.color.white};
  }
`;

const getClassColor = (color, props) => {
  switch (color) {
    case "primary":
      return cn(props.className, "ant-btn-primary");
    case "secondary":
      return cn(props.className, "ant-btn-secondary");
    case "brand-secondary":
      return cn(
        props.className,
        `${props.variant !== "default" ? props.variant : "btn"}-brand-secondary`
      );
    case "error":
      return cn(
        props.className,
        `${props.variant !== "default" ? props.variant : "ant-btn"}-error`
      );
    case "success":
      return cn(
        props.className,
        `${props.variant !== "default" ? props.variant : "ant-btn"}-success`
      );
    default:
      return cn(props.className, `ant-btn-custom-color`);
  }
};

const Button = ({ size, disabled, ...props }) => {
  // remove itens do props para não duplicar ou enviar parametros desnecessarios ao componente
  const { children, color, variant, textColor, ...other } = props;

  return (
    <CustomButton
      textcolor={textColor}
      size={size}
      className={getClassColor(color, props)}
      color={color}
      type={variant}
      disabled={disabled}
      aria-label={props["aria-label"] ? props["aria-label"] : children}
      id={props.id ? props.id : `cb-${Date.now()}`}
      {...other}
    >
      {props.children}
    </CustomButton>
  );
};

Button.propTypes = {
  textColor: PropTypes.string,
  /**
   * Tamanho do botao
   */
  size: PropTypes.oneOf(["small", "default", "large"]),
  /**
   * Variacoes
   */
  variant: PropTypes.oneOf(["dashed", "link", "ghost", "default"]),
  /**
   * Cores
   */
  color: PropTypes.string,
  /**
   * Icone
   */
  icon: PropTypes.any,
  /**
   * aria-label
   */
  "aria-label": PropTypes.string,
  /**
   * id
   */
  id: PropTypes.string,
};

Button.defaultProps = {
  size: "default",
  color: "primary",
  variant: "default",
};

export default Button;
