import { AtomPlatformProvider } from "atom-ui";
import {
  Description,
  Primary, Subtitle, Title
} from '@storybook/addon-docs/blocks';
import React from 'react';

const story = {
  title: 'Componentes/Provider/AtomPlatformProvider',
  component: AtomPlatformProvider,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <div>Componente responsável pela formatação de texto e carregamento dos css do ATOM UI, mais informações do uso das classes css pode ser obtida na página <a href="/?path=/docs/identidade-visual-tipografia--page">Tipografia</a></div>
          <Subtitle />
          <Description />
          <Primary />
        </>
      ),
    },
  },
};
export default story;

const Template = args => <AtomPlatformProvider {...args}>{args.children}</AtomPlatformProvider>

export const Default = Template.bind({});
Default.args = {
  children: <div><div className={"ui-kit font-size-xl"}>ATOM UI</div><div className={"ui-kit font-size-base-emphasys"}>ATOM UI</div><div className={"ui-kit font-size-sm"}>ATOM UI</div></div>
};
