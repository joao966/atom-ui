import { AtomPlatformProvider } from "atom-ui";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Default } from "../../../stories/componentes/layout/Label/Label.stories";

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AtomPlatformProvider {...providerProps}>{ui}</AtomPlatformProvider>,
    renderOptions
  );
};

describe("Componente Label", () => {
  it("Se componente renderiza tag certa, teste com div", () => {
    const { container } = customRender(
      <Default id="test-id" aria-label="Label Text" type="div">
        Label Teste
      </Default>,
      {}
    );
    const div = container.querySelector("div");
    expect(div).not.toBeNull();
  });

  it("Se é renderizado o conteúdo esperado", () => {
    customRender(
      <Default id="test-id" aria-label="Label Text">
        Label Teste
      </Default>,
      {}
    );
    const text = screen.getByText("Label Teste");
    expect(text).toBeInTheDocument();
  });

  it("Se é alterada a cor do texto", () => {
    customRender(
      <Default id="test-id" aria-label="Label Text" color="red">
        Label Teste
      </Default>,
      {}
    );
    const text = screen.getByText("Label Teste");
    expect(text).toHaveStyle("color: red");
  });

  it("se não for passada a cor ela deve ser Neutral[600] = #949595", () => {
    customRender(
      <Default id="test-id" aria-label="Label Text" type="span">
        Label Text
      </Default>,
      {}
    );
    const text = screen.getByText("Label Text");
    expect(text).toHaveStyle("color: #949595");
  });
});
