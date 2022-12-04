import { Text } from "atom-ui";
import React from "react";

const story = {
  title: `Componentes/Text/Exemplos`,
  component: Text,
  argTypes: {
    size: {
      type: { name: "string", required: false },
      description: "Define tamanho do texto",
      table: {
        defaultValue: { summary: "base" },
      },
      options: ["xl-4", "xl-3", "xl-2", "xl", "lg", "base", "sm", "xs", "xs-2"],
      control: {
        type: "select",
      },
    },
    emphasys: {
      type: { name: "boolean", required: false },
      defaultValue: false,
      description: "Da ênfase a fonte",
    },
    color: {
      type: { name: "string", required: false },
      description: "Define a cor da fonte",
    },
    type: {
      type: { name: "string", required: false },
      description: "Define a tag do componente",
      table: {
        defaultValue: { summary: "div" },
      },
      options: ["div", "span", "paragraph"],
      control: {
        type: "select",
      },
    },
  },
};

export default story;

const Template = (args) => <Text {...args}>{args.children}</Text>;

export const Basic = Template.bind({});
Basic.args = {
  id: "basic-text",
  children: "Eu consigo colocar um texto",
  emphasys: false,
  "aria-label": "Text"
};

export const ComDestaque = Template.bind({});
ComDestaque.args = {
  children: "Com um destaque em negrito",
  emphasys: true,
};

export const ComDestaqueTamanhoLg = Template.bind({});
ComDestaqueTamanhoLg.args = {
  ...ComDestaque.args,
  size: "lg",
  emphasys: true,
};

Text.parameters = {
  jest: ["Text.test.js"],
};
