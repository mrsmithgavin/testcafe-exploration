import { Selector } from 'testcafe';

export namespace ExamplePageSelectors {
  export const h1: selector = { 
    selector: Selector('h1'),
    text: 'Example',
    getText: (selector) => new Promise(resolve => {resolve(selector.textContent)})
    // getText: (selector) => {selector.textContent}
  };

  export const url = 'https://devexpress.github.io/testcafe/example/';
}

export interface selector {
  selector: Selector;
  text: string;
  getText: (selector) => any;
};
