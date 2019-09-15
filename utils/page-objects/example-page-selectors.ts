import { Selector } from 'testcafe';

async function getTextOne(element: Selector) { return element.textContent};

export namespace ExamplePageSelectors {
  export const h1: selector = { 
    selector: Selector('h1'),
    text: 'Example',
    // getText: (h1.selector) => new Promise(resolve => {resolve(selector.textContent)})
    getText: (selector) => new Promise(resolve => {resolve(selector.textContent)})
    // getText: (selector) => {selector.textContent}
  };
  // getText(selector1) { return selector1.textContent}
  // getText: Selector('h1').textContent
  export const url = 'https://devexpress.github.io/testcafe/example/';
}


function getThisThang(selector) 
{
  return (selector) => new Promise(resolve => {
    resolve(selector.textContent)});
}

export interface selector {
  selector: Selector;
  text: string;
getText: (selector) => any;
};
