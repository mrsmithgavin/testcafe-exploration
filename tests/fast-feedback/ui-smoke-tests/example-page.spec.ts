import { Selector, t, ClientFunction } from 'testcafe';
import { ExamplePageSelectors }  from '../../../utils/page-objects/example-page-selectors';
import { getPageUrl, getTextFromElement } from '../../../utils/page-objects/common';

const developerNameInput = Selector('#developer-name');

fixture`Example Page - UI Smoke tests`
  .page(ExamplePageSelectors.url);

test('Perform search and validate expected result found', async t => {
  await t.expect(getPageUrl()).eql('https://devexpress.github.io/testcafe/example/');
  const tmp = await ExamplePageSelectors.h1.selector
  await t
    .expect(await ExamplePageSelectors.h1.getText(tmp)).eql('Example');
  await t
    .expect(await getTextFromElement(ExamplePageSelectors.h1.selector)).eql('Example1');
  
})
