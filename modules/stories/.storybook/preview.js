import { AtomPlatformProvider } from "atom-ui";
import { withTests } from '@storybook/addon-jest';
import { addDecorator } from '@storybook/react'; // <- or your view layer
import "antd/dist/antd.css";
import ptBr from "axe-core/locales/pt_BR.json";
import results from '../src/.jest-test-results.json';

addDecorator(
  withTests({
    results,
  })
);

export const decorators = [
  (Story) => (
    <AtomPlatformProvider>
      <Story />
    </AtomPlatformProvider>
  )
];

export const parameters = {
  options: {
    storySort: {
      order: ['Introdução', 'Como usar', 'Identidade visual', 'Componentes', ["Layout", ["Card", "FormControl", "FlipCard"]], ["Button", ["Visão geral", "Variações", "Propriedades"]], ["Form", "CreditCard", ["Visão geral", "Variações", "Propriedades"]]]
    },
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  a11y: {
    config: {
      locale: {
        lang: ptBr.lang,
        rules: {
          ...ptBr.rules,
        }
      },
      // rules: [{
      //   id: "nested-interactive",
      //   enabled: false
      // }]
    },
    manual: false,
  }
}


