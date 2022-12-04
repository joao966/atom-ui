import React from "react";
import { Modal as ModalAntd } from "antd";
import { string, bool, func, oneOfType, arrayOf, node } from "prop-types";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Text from "../text/Text";

const StyledModal = styled(ModalAntd)`
  & .ant-btn-default {
    background-color: ${(props) => props.theme.color.neutral[400]};
    color: ${(props) => props.theme.color.neutral[100]};
    border: 1px solid ${(props) => props.theme.color.neutral[400]};
    border-radius: 4px;
    min-width: 60px;
    min-height: 40px;
  }

  & .ant-btn-primary {
    background-color: ${(props) => props.theme.color.brand.primary};
    color: ${(props) => props.theme.color.neutral[100]};
    border: 1px solid ${(props) => props.theme.color.brand.primary};
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    min-width: 60px;
    min-height: 40px;
  }

  & .ant-modal-body {
    color: ${(props) => props.theme.color.neutral[500]};
    font-size: 16px;
    line-height: 22px;
  }

  & .ant-modal-title {
    font-weight: 600;
    color: ${(props) => props.theme.color.neutral[1000]};
    font-size: 20px;
    font-weight: 600;
  }
`;

const ModalInfo = styled(StyledModal)`
  & .anticon-exclamation-circle {
    font-size: 42px;
    color: ${(props) => props.theme.color.brand.secondary};
    margin-right: 10px;
  }

  & .ant-modal-body {
    display: flex;
    min-height: 150px;
    word-break: break-all;
  }

  & .ant-modal-footer {
    border-top: none;
  }

  & .prev-modal-title {
    margin-left: 5px;
    font-weight: 600;
    color: ${(props) => props.theme.color.neutral[1000]};
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
  }
`;

const ModalWarning = styled(ModalInfo)`
  & .anticon-exclamation-circle {
    color: ${(props) => props.theme.color.functional.warning};
  }
`;

const ModalSuccess = styled(ModalWarning)`
  & .anticon-check-circle {
    color: ${(props) => props.theme.color.functional.success};
    font-size: 42px;
    margin-right: 10px;
  }
`;

const ModalError = styled(ModalSuccess)`
  & .anticon-close-circle {
    color: ${(props) => props.theme.color.functional.error};
    font-size: 42px;
    margin-right: 10px;
  }
`;

const ModalBody = styled.div``;

const ModalTitle = styled.div`
  && {
    margin-left: 5px;
    margin-bottom: 8px;
    font-weight: 600;
  }
`;

const ModalContent = styled.div`
  && {
    margin-left: 5px;
    color: ${(props) => props.theme.color.neutral[500]};
    font-size: 16px;
    line-height: 22px;
  }
`;

function Modal({ id, title, visible, onOk, onCancel, children, ...props }) {
  return (
    <StyledModal
      id={id ? id : "id-modal"}
      aria-label={
        props["aria-label"] ? props["aria-label"] : "aria-label-modal"
      }
      okText="Sim"
      cancelText="Não"
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      {...props}
    >
      {children}
    </StyledModal>
  );
}

Modal.propTypes = {
  id: string,
  "aria-label": string,
  title: oneOfType([node, string]),
  visible: bool,
  children: oneOfType([arrayOf(node), node, string]),
  onOk: func,
  onCancel: func,
};

function Info({ title, visible, onOk, onCancel, children, id, ...props }) {
  return (
    <ModalInfo
      id={id ? id : "id-modal"}
      aria-label={
        props["aria-label"] ? props["aria-label"] : "aria-label-modal"
      }
      okText="Sim"
      cancelText="Não"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      {...props}
    >
      <ExclamationCircleOutlined />
      <ModalBody>
        <ModalTitle>
          <Text
            id={props["title-id"]}
            aria-label={props["title-aria-label"]}
            size="lg"
            emphasys
          >
            {title}
          </Text>
        </ModalTitle>
        <ModalContent>{children}</ModalContent>
      </ModalBody>
    </ModalInfo>
  );
}

Info.propTypes = {
  id: string,
  "aria-label": string,
  "title-id": string,
  "title-aria-label": string,
  title: oneOfType([node, string]),
  visible: bool,
  children: oneOfType([arrayOf(node), node, string]),
  onOk: func,
  onCancel: func,
};

function Warning({ id, title, visible, onOk, onCancel, children, ...props }) {
  return (
    <ModalWarning
      id={id ? id : "id-modal"}
      aria-label={
        props["aria-label"] ? props["aria-label"] : "aria-label-modal"
      }
      okText="Sim"
      cancelText="Não"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      {...props}
    >
      <ExclamationCircleOutlined />
      <ModalBody>
        <ModalTitle>
          <Text
            id={props["title-id"]}
            aria-label={props["title-aria-label"]}
            size="lg"
            emphasys
          >
            {title}
          </Text>
        </ModalTitle>
        <ModalContent>{children}</ModalContent>
      </ModalBody>
    </ModalWarning>
  );
}

Warning.propTypes = {
  id: string,
  "aria-label": string,
  "title-id": string,
  "title-aria-label": string,
  title: oneOfType([node, string]),
  visible: bool,
  children: oneOfType([arrayOf(node), node, string]),
  onOk: func,
  onCancel: func,
};

function Success({ id, title, visible, onOk, onCancel, children, ...props }) {
  return (
    <ModalSuccess
      id={id ? id : "id-modal"}
      aria-label={
        props["aria-label"] ? props["aria-label"] : "aria-label-modal"
      }
      okText="Sim"
      cancelText="Não"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      {...props}
    >
      <CheckCircleOutlined />
      <ModalBody>
        <ModalTitle>
          <Text
            id={props["title-id"]}
            aria-label={props["title-aria-label"]}
            size="lg"
            emphasys
          >
            {title}
          </Text>
        </ModalTitle>
        <ModalContent>{children}</ModalContent>
      </ModalBody>
    </ModalSuccess>
  );
}

Success.propTypes = {
  id: string,
  "aria-label": string,
  "title-id": string,
  "title-aria-label": string,
  title: oneOfType([node, string]),
  visible: bool,
  children: oneOfType([arrayOf(node), node, string]),
  onOk: func,
  onCancel: func,
};

function Error({ id, title, visible, onOk, onCancel, children, ...props }) {
  return (
    <ModalError
      id={id ? id : "id-modal"}
      aria-label={
        props["aria-label"] ? props["aria-label"] : "aria-label-modal"
      }
      okText="Sim"
      cancelText="Não"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      {...props}
    >
      <CloseCircleOutlined />
      <ModalBody>
        <ModalTitle>
          <Text
            id={props["title-id"] ? props["title-id"] : "id-text"}
            aria-label={
              props["title-aria-label"]
                ? props["title-aria-label"]
                : "aria-label-text"
            }
            size="lg"
            emphasys
          >
            {title}
          </Text>
        </ModalTitle>
        <ModalContent>{children}</ModalContent>
      </ModalBody>
    </ModalError>
  );
}

Error.propTypes = {
  id: string,
  "aria-label": string,
  "title-id": string,
  "title-aria-label": string,
  title: oneOfType([node, string]),
  visible: bool,
  children: oneOfType([arrayOf(node), node, string]),
  onOk: func,
  onCancel: func,
};

Modal.Warning = Warning;
Modal.Success = Success;
Modal.Error = Error;
Modal.Info = Info;

export default Modal;
