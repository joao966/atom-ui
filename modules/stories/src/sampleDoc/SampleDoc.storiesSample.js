import { Button } from "atom-ui";
import React from 'react';

const story = {
    title: `Componentes / Sample / All Stories`,
    component: Button,
    argTypes: {
        size: {
            type: { name: 'string', required: false },
            defaultValue: 'middle',
            description: 'Define o tamanho do campo',
            table: {
                defaultValue: { summary: 'middle' },
            },
            options: ["small", "middle", "large"],
            control: {
                type: "radio"
            }
        },
        variant: {
            type: { name: 'string', required: false },
            description: 'Define a variação do botão',
            defaultValue: 'default',
            table: {
                defaultValue: { summary: 'default' },
            },
            options: ['ghost', 'dashed', 'link', 'default'],
            control: { type: 'radio' }
        },
        color: {
            type: { name: 'string', required: false },
            description: 'Define a cor principal do botão',
            defaultValue: 'primary',
            table: {
                defaultValue: { summary: 'primary' },
            },
            options: ['primary', 'secondary'],
            control: { type: 'radio' }
        },
        "icon": {
            type: { name: 'ReactNode', required:  false },
            description: 'Um icone renderizado dentro do botão `ReactNode`',
            control: { type: null }
        },
        "id": {
            type: { name: 'string', required: true },
            description: 'HTML global identificador `id`',
        },
        "aria-label": {
            type: { name: 'string', required: true },
            description: 'Define o `aria-label` para acessibilidade ',
        },
    },
    args: {
        children: 'Botão'
    },
};
export default story;

const Template = (args) => <Button {...args}>{args.children}</Button>
export const Default = Template.bind({})
Default.args = {
    "aria-label": "ação enviar"
}