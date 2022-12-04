import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import Button from "../../../buttons/Button";
import { AtomPlatformContext } from "../../../provider/AtomPlatformProvider";
import Text from "../../../text/Text";

const ConfirmExcludeContent = styled.div`
  display: flex;
  gap: 15px 0px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
`;

const ButtonsModalContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: end;
  margin: 25px 60px;
`;

const StyledModal = styled(Modal)`
  & .ant-modal-body {
    padding: 0px;
  }

  & .ant-modal-close {
    top: 0px;
    right: 0px;
    left: -80px;
  }
  .ant-modal-close-x {
    display: flex;
    flex-direction: column;
    width: 65px;
    height: 65px;
    background-color: ${(props) => props.theme.color.neutral[100]};
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.17) 0px 10px 30px 0px;
  }
`;

function ConfirmDeleteFile({
  showConfirmModal,
  currentFile,
  setShowConfirmModal,
  deleteServerFile,
}) {
  const { theme } = useContext(AtomPlatformContext);
  return (
    <StyledModal
      title={`Excluir "${currentFile?.name}" ?`}
      visible={showConfirmModal}
      footer={null}
      onCancel={() => setShowConfirmModal(!showConfirmModal)}
      closeIcon={
        <>
          <CloseOutlined style={{ color: theme.color.neutral[500] }} />
          <Text type="span" emphasys size="xs" color={theme.color.neutral[500]}>
            FECHAR
          </Text>
        </>
      }
    >
      <ConfirmExcludeContent>
        <Text
          style={{ alignSelf: "start" }}
          size="lg"
          color={theme.color.functional.error}
          emphasys
        >
          Atenção! Essa medida é irreversível.
        </Text>
        <Text>
          Ao excluir um arquivo você perderá total acesso ao arquivo excluido.
          Delete apenas se tem 100% de certeza que não precisará dele novamente.
        </Text>
        <ButtonsModalContainer style={{ alignSelf: "end", margin: 0 }}>
          <Button
            onClick={() => setShowConfirmModal(!showConfirmModal)}
            color="secondary"
            size="large"
          >
            Cancelar
          </Button>
          <Button onClick={() => deleteServerFile()} color="error" size="large">
            Sim, desejo excluir
          </Button>
        </ButtonsModalContainer>
      </ConfirmExcludeContent>
    </StyledModal>
  );
}

export default ConfirmDeleteFile;
