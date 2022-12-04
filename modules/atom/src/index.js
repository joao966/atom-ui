import "antd/dist/antd.css";
import React, { useState } from "react";
import { render } from "react-dom";
import {
  Card,
  AtomPlatformProvider,
  Tabs,
  Text,
  Button,
} from "./lib";
import "./lib/atom-ui.css";
import { Col, Form, Row } from "antd";
import UploadFile from "./lib/components/upload/UploadFile/UploadFile";

import axios from "axios";

const onFinish = (success) => {
  console.log({ success });
};

const onFinishFailed = (failed) => {
  console.log({ failed });
};

const App = () => {
  const [file, setFile] = useState([]);
  const [fileProgressBar, setFileProgressBar] = useState([]);
  const [files, setFiles] = useState([]);
  const [filesProgressBar, setFilesProgressBar] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  const uploadWithoutMultiple = async (file) => {
    const auth = "Bearer " + 'token';

    let data = new FormData();
    data.append("prop", file.originFileObj, file.name);

    return axios
      .put('', data, {
        headers: { Authorization: auth },
        onUploadProgress: (event) => {
          let progress = parseInt(Math.round(event.loaded * 100) / event.total);
          setFileProgressBar((prevState) => {
            const filesAtualizados = prevState.map((previousFile) => {
              if (previousFile.uid === file.uid) {
                return {
                  file,
                  uid: file.uid,
                  progress,
                  error: false,
                  success: false,
                  errorResponse: "",
                };
              }
              return previousFile;
            });
            return filesAtualizados;
          });
        },
      })
      .then(function (response) {
        if (response.data) {
          setFileProgressBar((prevState) => {
            const filesAtualizados = prevState.map((previousFile) => {
              if (previousFile.uid === file.uid) {
                return {
                  file,
                  uid: file.uid,
                  progress: 100,
                  error: false,
                  success: true,
                  errorResponse: "",
                };
              }
              return previousFile;
            });
            return filesAtualizados;
          });
        }
      })
      .catch(function (error) {
        setFileProgressBar((prevState) => {
          const filesAtualizados = prevState.map((previousFile) => {
            if (previousFile.uid === file.uid) {
              return {
                file,
                uid: file.uid,
                progress: 100,
                error: true,
                success: false,
                errorResponse: error?.response?.data?.error_description,
              };
            }
            return previousFile;
          });
          return filesAtualizados;
        });
      });
  };

  const uploadWithMultiple = async (file) => {
    const auth = "Bearer " + '';
    console.log(file);

    let data = new FormData();
    data.append("prop", file.originFileObj, file.name);

    return axios
      .put('url', data, {
        headers: { Authorization: auth },
        onUploadProgress: (event) => {
          let progress = parseInt(Math.round(event.loaded * 100) / event.total);
          setFilesProgressBar((prevState) => {
            const filesAtualizados = prevState.map((previousFile) => {
              if (previousFile.uid === file.uid) {
                return {
                  file,
                  uid: file.uid,
                  progress,
                  error: false,
                  success: false,
                  errorResponse: "",
                };
              }
              return previousFile;
            });
            return filesAtualizados;
          });
        },
      })
      .then(function (response) {
        if (response.data) {
          setFilesProgressBar((prevState) => {
            const filesAtualizados = prevState.map((previousFile) => {
              if (previousFile.uid === file.uid) {
                return {
                  file,
                  uid: file.uid,
                  progress: 100,
                  error: false,
                  success: true,
                  errorResponse: "",
                };
              }
              return previousFile;
            });
            return filesAtualizados;
          });
        }
      })
      .catch(function (error) {
        setFilesProgressBar((prevState) => {
          const filesAtualizados = prevState.map((previousFile) => {
            if (previousFile.uid === file.uid) {
              return {
                file,
                uid: file.uid,
                progress: 100,
                error: true,
                success: false,
                errorResponse: error?.response?.data?.error_description,
              };
            }
            return previousFile;
          });
          return filesAtualizados;
        });
      });
  };


  return (
    <>
      <Card display="flex" alignItems="center" direction="column">
        <Text size="xl" emphasys color="primary">WELCOME TO ATOM UI COMPONENTS</Text>
        <Tabs
          style={{width: '100%'}}
          defaultActiveKey="0"
          id="example-id"
          tabPosition="top"
          components={[
            {
              disabled: false,
              title: "Button",
              value: <Button>Button</Button>,
            },
            {
              disabled: false,
              title: "Text",
              value: <Text>Text</Text>,
            },
            {
              disabled: true,
              title: "Desabilitado",
              value: <h1>Tab inacessível</h1>,
            },
            {
              disabled: false,
              title: "Upload de Arquivos",
              value: (
                <Form
                  onFinish={(evt) => onFinish(evt)}
                  onFinishFailed={(evt) => onFinishFailed(evt)}
                  name="test-upload-file"
                >
                  <Row gutter={50}>
                
                    <Col span={12}>
                      <Text size="lg">
                        single upload
                      </Text>
                      <div style={{ padding: "20px 0px 40px 0px" }}>
                        <UploadFile
                          files={fileProgressBar}
                          setFiles={setFileProgressBar}
                          sendFileFunction={() =>
                            setDisableButton(!disableButton)
                          }
                          disableSendFileButton={disableButton}
                          accept=".pdf"
                          showProgressBar
                          onChange={({ fileList }) => {
                            // console.log(fileList[0]);
                            uploadWithoutMultiple(fileList[0]);
                          }}
                        />
                      </div>
                    </Col>
                
                    <Col span={12}>
                      <Text size="lg">
                        Multiples uploads
                      </Text>
                      <div style={{ padding: "20px 0px 40px 0px" }}>
                        <UploadFile
                          files={filesProgressBar}
                          setFiles={setFilesProgressBar}
                          sendFileFunction={() =>
                            setDisableButton(!disableButton)
                          }
                          disableSendFileButton={disableButton}
                          accept=".pdf"
                          multiple
                          showProgressBar
                          onChange={({ fileList }) => {
                            fileList.forEach((file) => {
                              uploadWithMultiple(file);
                            });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Form>
              ),
            },
          ]}
        />
      </Card>
    </>
  );
};

render(
  <AtomPlatformProvider>
    <App />
  </AtomPlatformProvider>,
  document.getElementById("root")
);
