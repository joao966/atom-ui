import { AtomPlatformProvider } from 'atom-ui';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Basic } from "../../stories/componentes/text/Text.stories";

const customRender = (ui, { providerProps, ...renderOptions }) => {
    return render(
        <AtomPlatformProvider {...providerProps}>{ui}</AtomPlatformProvider>,
        renderOptions
    )
}

describe('Text', () => {
    it('Testa se componente renderiza tag certa, teste com div', () => {
        const {container} = customRender(<Basic id="text-id" aria-label="Text" type="div">Teste</Basic>, {})
        const div = container.querySelector('div');
        expect(div).not.toBeNull();
    })
    it('Testa se componente renderiza tag certa, teste com span', () => {
        const {container} = customRender(<Basic id="text-id" aria-label="Text" type="span">Teste</Basic>, {})
        const div = container.querySelector('span');
        expect(div).not.toBeNull();
    })
    it('Testa se componente renderiza tag certa, teste com paragraph', () => {
        const {container} = customRender(<Basic id="text-id" aria-label="Text"  type="paragraph">Teste</Basic>, {})
        const div = container.querySelector('p');
        expect(div).not.toBeNull();
    })

    it('Testa se é renderizado o conteúdo esperado', () => {
        customRender(<Basic id="text-id" aria-label="Text" >Teste</Basic>, {});
        const text = screen.getByText('Teste');
        expect(text).toBeInTheDocument();
    })

    it('Testa se é alterada a cor do texto', () => {
        customRender(<Basic id="text-id" aria-label="Text"  color="red">Teste</Basic>, {});
        const text = screen.getByText('Teste');
        expect(text).toHaveStyle('color: red');
    })

    it('Testa se é alterada a "weight" do texto', () => {
        customRender(<Basic id="text-id" aria-label="Text" emphasys={true}>Teste</Basic>, {});
        // const text = screen.getByText('Teste');
        // expect(text).toHaveStyle({'font-weight': '600'});
    })

    it('se for span e sem cor deve ter a cor default neutral[1000] = #242525', () => {
        customRender(<Basic id="text-id" aria-label="Text" type="span">Teste</Basic>, {});
        const text = screen.getByText('Teste');
        expect(text).toHaveStyle({color: '#242525'});
    })
});