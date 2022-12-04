import { Button } from "atom-ui";
import React from 'react';


const story = {
    title: `Componentes / Sample / Propriedades`,
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
        "disabled": {
            type: { name: 'boolean', required: false },
            description: 'Se habilita ou não o botão `boolean`',
        },
        "id": {
            type: { name: 'string', required: true },
            description: 'Atributo de id global, único em todo o documento `string`',
        },
        "aria-label": {
            type: { name: 'string', required: true },
            description: 'Define o `aria-label` para acessibilidade ',
        },
    },
    args: {
        children: 'Define o nome no botao'
    }
};
export default story;

export const Propriedades = (args) => <Button {...args}>{args.children}</Button>