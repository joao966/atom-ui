import React, { useContext, useState } from "react";
import { Progress, Upload } from "antd";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  FileTextOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import Button from "../../buttons/Button";
import Text from "../../text/Text";
import { AtomPlatformContext } from "../../provider/AtomPlatformProvider";
import styled from "styled-components";
import UploadFileModal from "./UploadFileModal/UploadFileModal";

const StyledDragger = styled(Upload.Dragger)`
  &.ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover,
  &.ant-upload.ant-upload-drag {
    border: 2px dashed ${(props) => props.theme.color.brand.primary};
    background-color: ${(props) => props.theme.color.neutral[100]};
    border-radius: 4px;
  }
  & .anticon-cloud-upload {
    color: ${(props) => props.theme.color.brand.primary};
    font-size: 40px;
    margin: 21px 0px 25px 0px;
  }
`;

const CustomButtonContent = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;

  & .anticon-folder,
  & .anticon-file-text {
    font-size: 40px;
  }
`;

const FileContainer = styled.div`
  min-height: 65px;
  width: 100%;
  border: 2px solid ${(props) => props.theme.color.brand.primary};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2px 8px;
`;

function UploadFile({
  files = [],
  setFiles = () => {},
  sendMoreFilesButton,
  showProgressBar = false,
  multiple = false,
  ...props
}) {
  const { theme } = useContext(AtomPlatformContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const renderModal = modalIsOpen && multiple && (
    <UploadFileModal
      files={files}
      setFiles={setFiles}
      uploadProps={props}
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
      sendMoreFilesButton={sendMoreFilesButton}
      showProgressBar={showProgressBar}
      multiple={multiple}
    />
  );

  const countSendedFiles = (files) => {
    if (showProgressBar) {
      let filesSended = 0;
      let errorResponse = "";

      files.forEach((file) => {
        if (file.success) {
          filesSended += 1;
        }
        if (!multiple && file.errorResponse) {
          errorResponse = file.errorResponse;
        }
      });

      if (errorResponse) {
        return (
          <Text color={theme.color.neutral[500]} size="xs">
            {errorResponse}
          </Text>
        );
      }

      if (filesSended === 0) {
        return (
          <Text color={theme.color.neutral[500]} size="xs">
            Nenhum arquivo enviado
          </Text>
        );
      } else {
        return (
          <Text color={theme.color.neutral[500]} size="xs">
            {filesSended}{" "}
            {filesSended > 1 ? "arquivos enviados" : "arquivo enviado"}
          </Text>
        );
      }
    }
    return (
      <Text color={theme.color.neutral[500]} size="xs">
        {files.length}{" "}
        {files.length > 1 ? "arquivos enviados" : "arquivo enviado"}
      </Text>
    );
  };

  const renderPastaArquivos = () => {
    if (multiple) {
      return (
        <>
          <Button
            aria-label="button-number-files"
            style={{ minHeight: 65, width: "100%" }}
            color="secondary"
          >
            <CustomButtonContent onClick={() => setModalIsOpen(!modalIsOpen)}>
              <FolderOutlined />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Text color={theme.color.neutral[1000]}>
                  Documentos Enviados
                </Text>
                {countSendedFiles(files)}
              </div>
            </CustomButtonContent>
          </Button>
          {renderModal}
        </>
      );
    }
    return (
      <FileContainer>
        <CustomButtonContent
          style={{ alignItems: "center" }}
          onClick={() => setModalIsOpen(!modalIsOpen)}
        >
          <FileTextOutlined style={{ color: theme.color.brand.primary }} />
          <div style={{ width: "100%" }}>
            <Text
              style={{ wordBreak: "break-all" }}
              color={theme.color.neutral[1000]}
            >
              {files[0].file.name}
            </Text>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Progress
                size="small"
                percent={showProgressBar ? files[0].progress : 100}
                status={files[0].error ? "exception" : ""}
              />
              <DeleteOutlined
                style={{ color: theme.color.brand.primary }}
                onClick={() => setFiles([])}
              />
            </div>
            {countSendedFiles(files)}
          </div>
        </CustomButtonContent>
      </FileContainer>
    );
  };

  // se tiver arquivos upados nao renderiza drawer e renderiza Upload com pasta
  return files?.length > 0 ? (
    renderPastaArquivos()
  ) : (
    <>
      <StyledDragger
        showUploadList={false}
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
                  errorResponse: "",
                }
              : { file },
          ]);
          setModalIsOpen(!modalIsOpen);
          return false;
        }}
        setFiles={setFiles}
        multiple={multiple}
        style={{ padding: "0px 40px" }}
        {...props}
      >
        <CloudUploadOutlined />
        <Text style={{ marginBottom: 14 }} size="sm">
          {multiple
            ? "Arraste para cá os arquivos ou clique para importá-los"
            : "Arraste para cá o arquivo ou clique para importá-lo"}
        </Text>
        <Button style={{ marginBottom: 8 }} color={theme.color.brand.primary}>
          {multiple ? "Buscar Arquivos" : "Buscar Arquivo"}
        </Button>
      </StyledDragger>
      {renderModal}
    </>
  );
}

export default UploadFile;
