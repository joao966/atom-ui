import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const ContextToggle = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.color.white};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.1s;

  // & .dark {
  //   opacity: .5;
  // }

  & .toggle {
    position: absolute;
    width: 50%;
    background-color: ${(props) => props.theme.color.light.grayish.blue};
    // box-shadow: 0 2px 8px rgba(0,0,0,.15);
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  & label,
  & .toggle {
    height: 32px;
    border-radius: 100px;
  }

  & .names {
    user-select: none;

    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;

    position: relative;
    display: flex;
    justify-content: space-around;
    height: 100%;
    align-content: center;
    flex-direction: row;
    align-items: center;
  }

  & .names .light {
    color: ${(props) => props.theme.color.brand.secondary};
  }

  & .names .dark {
    color: ${(props) => props.theme.color.white};
  }
`;

const Label = styled.label`
  width: 100%;
  background-color: #dddddc;
  border-radius: 100px;
  position: relative;
  // margin: 1rem;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  position: absolute;
  visibility: hidden;
  display: none;

  &:checked + ${Label} .toggle {
    transform: translateX(100%);
    background-color: ${(props) => props.theme.color.light.grayish.blue};
  }

  &:disabled + ${Label} {
    cursor: not-allowed;
  }

  &:checked + ${Label} .names .dark {
    opacity: 1;
    color: ${(props) => props.theme.color.brand.secondary};
  }

  &:checked + ${Label} .names .light {
    opacity: 0.5;
    color: ${(props) => props.theme.color.white};
  }
`;

const ToggleButton = ({
  id,
  size,
  disabled,
  options = [
    { label: "Mensal", value: "mensal" },
    { label: "Anual", value: "anual" },
  ],
  onClick,
  style,
  ...props
}) => {
  return (
    <ContextToggle style={style}>
      <CheckboxInput
        disabled={disabled}
        type="checkbox"
        id={id ? id : "switch"}
        onClick={(e) => {
          if (onClick) onClick(e.target.checked ? options[1] : options[0]);
        }}
        aria-label={props["aria-label"] ? props["aria-label"] : "toggle-button"}
        {...props}
      />
      <Label htmlFor={id ? id : "switch"}>
        <div className="toggle"></div>
        <div className="names">
          <div className="light">{options[0].label}</div>
          <div className="dark">{options[1].label}</div>
        </div>
      </Label>
    </ContextToggle>
  );
};

ToggleButton.propTypes = {
  /**
   * Tamanho do botao
   */
  size: PropTypes.oneOf(["small", "middle", "large"]),
  /**
   * Variacoes
   */
  variant: PropTypes.oneOf(["dashed", "link", "ghost", "default"]),
  /**
   * Variacoes
   */
  color: PropTypes.oneOf(["primary", "secondary"]),
  /**
   * Icone
   */
  icon: PropTypes.element,
  /**
   * aria-label
   */
  "aria-label": PropTypes.string.isRequired,
};

ToggleButton.defaultProps = {
  size: "middle",
  color: "primary",
  variant: "default",
};

export default ToggleButton;
