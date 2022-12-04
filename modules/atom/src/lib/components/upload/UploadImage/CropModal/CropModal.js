import React, { forwardRef, useRef } from "react";
import Modal from "../../../modal/Modal";
import ReactCropper from "../ReactCropper/ReactCropper";

const CropModal = forwardRef(
  (
    {
      open,
      onClose,
      src,
      onFinish,
      title = "Editar imagem",
      width = 760,
      ...props
    },
    ref
  ) => {
    const cropperRef = useRef(ref);

    return (
      <>
        <Modal
          title={title}
          visible={open}
          onCancel={onClose}
          destroyOnClose={true}
          maskClosable={false}
          width={width}
          footer={false}
        >
          <ReactCropper
            inputRef={cropperRef}
            src={src}
            onFinish={onFinish}
            {...props}
          />
        </Modal>
      </>
    );
  }
);

export default CropModal;
