import { AtomPlatformProvider } from "atom-ui";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Raw } from "../../stories/componentes/form/uploadFile/UploadFile.stories";

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AtomPlatformProvider {...providerProps}>{ui}</AtomPlatformProvider>,
    renderOptions
  );
};

describe("UploadFile", () => {
  it("Verifica se ao passar arquivos pela propriedade files, o componente correto é renderizado", () => {
    const filesMock = [
      {
        file: {
          uid: 1,
          name: "teste.png",
        },
      },
      {
        file: {
          uid: 2,
          name: "teste2.png",
        },
      },
    ];

    customRender(<Raw files={filesMock} />, {});

    const folderIcon = screen.queryByRole("img", { name: "file-text" });
    const primaryText = screen.queryByText(/teste.png/i);
    const secondarytext = screen.queryByText(
      `${filesMock.length} arquivos enviados`
    );
    expect(folderIcon).toBeInTheDocument();
    expect(primaryText).toBeInTheDocument();
    expect(secondarytext).toBeInTheDocument();
  });

  it("Verifica se ao NÃO passar arquivos pela propriedade files, o componente correto é renderizado", () => {
    const filesMock = [];
    customRender(<Raw files={filesMock} />, {});

    const cloundUploadIcon = screen.queryByRole("img", {
      name: "cloud-upload",
    });

    const primaryText = screen.queryByText(
      /arraste para cá o arquivo ou clique para importá-lo/i
    );

    const buttonSearchFiles = screen.queryByRole("button", {
      name: "Buscar Arquivo",
    });

    expect(cloundUploadIcon).toBeInTheDocument();
    expect(primaryText).toBeInTheDocument();
    expect(buttonSearchFiles).toBeInTheDocument();
  });

});
