import { Label } from "atom-ui";
import React from 'react';

const story = {
    title: `Componentes/Layout/Label/Exemplos`,
    component: Label,
    argTypes: {
        size: {
            type: { name: "string", required: false },
            description: "Define tamanho do texto da Label",
            table: {
                defaultValue: { summary: "base" },
            },
            options: ["xl-4", "xl-3", "xl-2", "xl", "lg", "base", "sm", "xs", "xs-2"],
            control: {
                type: "select",
            },
        },
        color: {
            table: {
                defaultValue: { summary: "#949595" },
            },
            defaultValue: "#949595",
            type: { name: "string", required: false },
            description: "Define a cor da fonte",
        },
        "aria-label": {
            type: { name: 'string', required: true },
            description: 'Define o `aria-label` para acessibilidade ',
        },
        "id": {
            type: { name: 'string', required: true },
            description: 'Define o `id` da Label ',
        },
    },

};
export default story;

const Template = (args) => <Label {...args}>{args.children}</Label>

export const Default = Template.bind({})
Default.args = {
    children: 'Label component text',
    "aria-label": "Label text"
}

export const Bigger = Template.bind({})
Bigger.args = {
    children: 'Label component text',
    size: "xl-4",
    "aria-label": "Label text"
}

export const Smaller = Template.bind({})
Smaller.args = {
    children: 'Label component text',
    size: "xs-2",
    "aria-label": "Label text"
}

Label.parameters = {
    jest: ["Label.test.js"],
};
