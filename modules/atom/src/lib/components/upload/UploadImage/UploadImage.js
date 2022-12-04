import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import React, { useState } from "react";
import Button from "../../buttons/Button";
import CropModal from "./CropModal/CropModal";

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

/*
const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};
*/
function UploadImage({
  textButton = "Carregar nova imagem",
  textAlterar = "Alterar",
  textRemover = "Remover",
  buttonSize,
  previewSize = { width: `200px`, height: `200px` },
  canvasSize = { width: `330px`, height: `330px` },
  onChange,
  value,
  buttonStyle = { overflow: "hidden", width: "100%" },
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(value);

  return (
    <>
      <CropModal
        getPopupContainer={(trigger) => trigger}
        onClose={() => setIsOpen(false)}
        onFinish={(croppedImage) => {
          if (onChange) {
            onChange({
              base64: croppedImage,
              file: dataURItoBlob(croppedImage),
            });
          }

          setImage(croppedImage);
          setIsOpen(!!!isOpen);
        }}
        open={isOpen}
        previewSize={previewSize}
        canvasSize={canvasSize}
        src={image}
        {...props}
      />

      <Row justify="center" align="middle" gutter={8}>
        {image && (
          <Col span={12}>
            <Row type="flex" gutter={8} style={{ marginBottom: 8 }}>
              <Col span={24}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    alt="Preview da imagem"
                    style={{
                      maxHeight: previewSize.height,
                      overflow: "hidden",
                    }}
                    src={image}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        )}
        {image ? (
          <>
            <Col span={12}>
              <Row gutter={[0, 20]} align="bottom">
                <Col span={24}>
                  <Button
                    id="prev-upload-btn-alterar"
                    onClick={() => setIsOpen(true)}
                    size={buttonSize}
                    icon={<EditOutlined />}
                    style={buttonStyle}
                    color="secondary"
                  >
                    {textAlterar}
                  </Button>
                </Col>
                <Col span={24}>
                  <Button
                    style={buttonStyle}
                    color="secondary"
                    id="prev-upload-btn-remover"
                    onClick={() => {
                      if (onChange) onChange(undefined);
                      setImage(undefined);
                    }}
                    size={buttonSize}
                    icon={<DeleteOutlined />}
                  >
                    {textRemover}
                  </Button>
                </Col>
              </Row>
            </Col>
          </>
        ) : (
          <Col span={24}>
            <Button
              style={buttonStyle}
              color="secondary"
              onClick={() => {
                setIsOpen(!!!isOpen);
              }}
              icon={<UploadOutlined />}
              size={buttonSize}
            >
              {textButton}
            </Button>
          </Col>
        )}
      </Row>
    </>
  );
}

export default UploadImage;
