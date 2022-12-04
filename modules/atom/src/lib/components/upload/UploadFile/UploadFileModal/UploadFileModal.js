import React, { useContext, useState } from "react";
import { Modal, Upload, Row, Col, Progress } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  EyeOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import Button from "../../../buttons/Button";
import styled from "styled-components";
import { AtomPlatformContext } from "../../../provider/AtomPlatformProvider";
import Text from "../../../text/Text";
import ConfirmDeleteFile from "../ConfirmDeleteFile/ConfirmDeleteFile";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  & .anticon-paper-clip,
  & .anticon-eye,
  & .anticon-delete {
    font-size: 20px;
    color: ${(props) => props.theme.color.neutral[600]};
  }
`;

const ButtonsModalContainer = styled.div`
  display: flex;
  justify-content: end;
  margin: 16px;
`;

const StyledModal = styled(Modal)`
  & .ant-modal-body {
    padding: 0px;
  }

  & .ant-modal-header {
    padding: 30px 40px;
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

const StyledGridContainer = styled.div`
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.11);
  max-height: 200px;
  overflow: auto;
  background-color: ${(props) => props.theme.color.neutral[200]};
`;

const CenteredFileName = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

function UploadFileModal({
  files,
  setFiles,
  uploadProps,
  modalIsOpen,
  setModalIsOpen,
  sendMoreFilesButton,
  showProgressBar,
  multiple,
}) {
  const { theme } = useContext(AtomPlatformContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentFile, setCurrentFile] = useState({});

  // verifica se existem arquivos novos no componente
  const haveNewFiles = files.length >= 1;

  // verifica se está deletando algo do servidor
  const checkForDeleteServerFile = (file) => {
    console.log(file.file.uid);
    console.log(files[0].file.uid);
    const newFilesList = files.filter(
      (fileFilter) => fileFilter.file.uid !== file.file.uid
    );

    // mensagem perguntando se está ciente de deletar
    if (files.length > newFilesList.length) {
      setCurrentFile(file.file);
      setShowConfirmModal(!showConfirmModal);
    }
  };

  // Delete file do servidor
  const deleteServerFile = () => {
    setShowConfirmModal(!showConfirmModal);
    const newFilesList = files.filter(
      (fileSended) => fileSended.file.uid !== currentFile.uid
    );
    console.log(newFilesList);
    console.log(files);
    setFiles(newFilesList);
    // Verifica se há arquivos, se não, fecha modal
    if (newFilesList.length === 0) return setModalIsOpen(false);
  };

  const getBase64 = async (file) => {
    const result = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    const contentType = file.type;

    // https://stackoverflow.com/questions/27798126/how-to-open-the-newly-created-image-in-a-new-tab

    const byteCharacters = atob(
      result.substr(`data:${contentType};base64,`.length)
    );
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, "_blank");
  };

  const headerGridModal = (
    <Col span={24}>
      <StyledGridContainer>
        <Row justify="center">
          <Col span={18}>
            <Text size="xs" emphasys color="rgba(0, 0, 0, 0.58005)">
              ARQUIVO
            </Text>
          </Col>
          <Col span={3}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Text size="xs" emphasys color="rgba(0, 0, 0, 0.58005)">
                VISUALIZAR
              </Text>
            </div>
          </Col>
          <Col span={3}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Text size="xs" emphasys color="rgba(0, 0, 0, 0.58005)">
                AÇÕES
              </Text>
            </div>
          </Col>
        </Row>
      </StyledGridContainer>
    </Col>
  );

  const getResponseFromFile = (file) => {
    if (showProgressBar) {
      if (file.error) {
        return (
          <Progress
            type="circle"
            width={20}
            percent={file.progress}
            status="exception"
          />
        );
      }
      return <Progress type="circle" width={20} percent={file.progress} />;
    }
    return <Progress type="circle" width={20} percent={100} />;
  };

  const bodyGridModal = (
    <Col span={24}>
      <StyledGridContainer>
        <Row justify="center" gutter={[0, 18]}>
          {files.map((file) => (
            <Col span={24} key={file.file.uid}>
              <Row>
                <Col span={15}>
                  <CenteredFileName>
                    {<PaperClipOutlined />}
                    {
                      <Text
                        style={{ wordBreak: "break-all", paddingRight: 10 }}
                        color="black"
                        type="span"
                        size="sm"
                      >
                        {file.file.name}
                      </Text>
                    }
                  </CenteredFileName>
                </Col>
                <Col span={3}>{getResponseFromFile(file)}</Col>
                <Col span={3}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {
                      <EyeOutlined
                        onClick={() => {
                          getBase64(
                            showProgressBar
                              ? file.file.originFileObj
                              : file.file
                          );
                        }}
                      />
                    }
                  </div>
                </Col>
                <Col span={3}>
                  <div
                    style={{
                      display: "flex",
                      marginRight: 5,
                      justifyContent: "flex-end",
                    }}
                  >
                    <DeleteOutlined
                      onClick={() => checkForDeleteServerFile(file)}
                    />
                  </div>
                </Col>
                {console.log(file)}
                {file.error && file.errorResponse && (
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    <Text color={theme.color.functional.error} size="xs">
                      {file.errorResponse}
                    </Text>
                  </div>
                )}
              </Row>
            </Col>
          ))}
        </Row>
      </StyledGridContainer>
    </Col>
  );

  const completeGridBody = (
    <Row>
      {headerGridModal}
      {bodyGridModal}
    </Row>
  );

  return (
    <>
      <StyledModal
        title={
          haveNewFiles ? "Upload de arquivos" : "Lista de arquivos enviados"
        }
        visible={modalIsOpen}
        onCancel={() => setModalIsOpen(!modalIsOpen)}
        footer={null}
        closeIcon={
          <>
            <CloseOutlined style={{ color: theme.color.neutral[500] }} />
            <Text
              type="span"
              emphasys
              size="xs"
              color={theme.color.neutral[500]}
            >
              FECHAR
            </Text>
          </>
        }
      >
        <ModalContent>
          {completeGridBody}
          <ButtonsModalContainer>
            <Upload
              beforeUpload={(file) => {
                setFiles((prevState) => [
                  ...prevState,
                  showProgressBar
                    ? {
                        file,
                        uid: file.uid,
                        progress: 0,
                        error: false,
                        success: false,
                      }
                    : { file },
                ]);
                return false;
              }}
              showUploadList={false}
              multiple={multiple}
              {...uploadProps}
            >
              {sendMoreFilesButton ? (
                sendMoreFilesButton
              ) : (
                <Button size="large">Adicionar mais arquivos</Button>
              )}
            </Upload>
          </ButtonsModalContainer>
        </ModalContent>
      </StyledModal>
      {showConfirmModal && (
        <ConfirmDeleteFile
          showConfirmModal={showConfirmModal}
          currentFile={currentFile}
          setShowConfirmModal={setShowConfirmModal}
          deleteServerFile={deleteServerFile}
        />
      )}
    </>
  );
}

export default UploadFileModal;
