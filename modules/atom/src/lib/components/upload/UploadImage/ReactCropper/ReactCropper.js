import { Col, Row } from "antd";
import "cropperjs/dist/cropper.css";
import React, { forwardRef, useContext, useRef, useState } from "react";
import Cropper from "react-cropper";
import Button from "../../../buttons/Button";
import { AtomPlatformContext } from "../../../provider/AtomPlatformProvider";
import Text from "../../../text/Text";

const uniqueID = `__AUTO__${Date.now()}__`;

export const ReactCropper = forwardRef(
  ({ src, onFinish, previewSize, canvasSize, buttonSize, ...props }, ref) => {
    const { theme } = useContext(AtomPlatformContext);
    const imageRef = useRef(ref);

    const [image, setImage] = useState(src);
    const [cropper, setCropper] = useState();

    const onSelectedFile = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setImage(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    };

    const getCropData = () => {
      if (typeof cropper !== "undefined") {
        onFinish(
          cropper
            .getCroppedCanvas({ maxWidth: 200, maxHeight: 200 })
            .toDataURL()
        );
      }
    };

    return (
      <>
        <Row justify="center" gutter={16}>
          <Col sm={16} md={12}>
            <div
              style={{
                border: `2px dashed ${theme.color.neutral[500]}`,
                backgroundColor: `${theme.color.neutral[400]}`,
                borderRadius: 4,
                width: canvasSize.width,
                height: canvasSize.height,
                padding: "1px",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
              onClick={() => {
                if (!image) document.getElementById(uniqueID).click();
              }}
            >
              {!image ? (
                <Text color={theme.color.neutral[600]} style={{ padding: 10 }}>
                  Para carregar uma imagem clique aqui ou em "Selecionar
                  imagem".
                </Text>
              ) : (
                <Cropper
                  initialAspectRatio={16 / 9}
                  style={{ width: "100%", height: "100%" }}
                  preview={`.img-preview`}
                  src={image}
                  ref={imageRef}
                  background={true}
                  responsive={true}
                  minCropBoxWidth={120}
                  minCropBoxHeight={Number(
                    previewSize.height.replaceAll(`px`, ``)
                  )}
                  checkOrientation={true} // https://github.com/fengyuanchen/cropperjs/issues/671
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                  setCropBoxData={{ height: 64 }}
                  {...props}
                />
              )}
            </div>
          </Col>
          <Col sm={8} md={12}>
            {image && (
              <>
                <div>
                  <Text emphasys color={theme.color.neutral[1000]}>
                    Pré-visualização
                  </Text>
                  <div
                    className="img-preview"
                    style={{
                      width: previewSize.width,
                      height: previewSize.height,
                      minHeight: previewSize.height,
                      overflow: "hidden",
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: 10,
                    backgroundColor: theme.color.neutral[300],
                    borderRadius: 4,
                    borderColor: theme.color.neutral[400],
                    margin: "10px 0",
                  }}
                >
                  <Text
                    color={theme.color.neutral[1000]}
                    style={{ textAlign: "justify" }}
                  >
                    Para dar ZOOM na imagem posicione o mouse sobre a imagem a
                    esquerda e rode com o SCROLL("rodinha do mouse"), encaixe a
                    imagem em pré-visualizar clique em salvar!
                  </Text>
                </div>
              </>
            )}
            <Row justify="center" gutter={16}>
              <Col sm={24} md={12}>
                <Button
                  aria-label="Botão selecionar imagem"
                  color="secondary"
                  id="select-img"
                  style={{
                    borderColor: theme.color.neutral[600],
                    color: theme.color.neutral[600],
                    width: `max-content`,
                    margin: 15,
                  }}
                  size={buttonSize}
                  onClick={() => {
                    document.getElementById(uniqueID).click();
                  }}
                >
                  Selecionar imagem
                </Button>
              </Col>
              <Col sm={24} md={12}>
                <Button
                  disabled={!image}
                  aria-label="Botão salvar"
                  color="primary"
                  data-testid="btn-save"
                  id="btn-save"
                  size={buttonSize}
                  style={{ width: "max-content", margin: 15 }}
                  onClick={() => {
                    getCropData();
                  }}
                >
                  Salvar imagem
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* <Text color={theme.color.neutral[1000]}>
          Clique em "Selecionar imagem", para carregar a imagem
        </Text>

        <Text color={theme.color.neutral[1000]}>
          Para dar ZOOM na imagem posicione o mouse sobre a imagem e rode com o
          SCROLL do mouse, encaixe a imagem no preview da melhor forma.
        </Text> */}

        <input
          type="file"
          id={uniqueID}
          accept="image/*"
          onChange={onSelectedFile}
          hidden
        />
      </>
    );
  }
);

export default ReactCropper;
