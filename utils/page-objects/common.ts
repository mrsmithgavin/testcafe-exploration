import { ClientFunction } from 'testcafe';

export const getPageUrl = ClientFunction(() => window.location.href);

export async function getTextFromElement(element: Selector) {
  return element.textContent
};

export const getOptionsFromDropDown = ClientFunction((selector: string) => {
  const select = document.querySelector(selector);
  const options = select.querySelectorAll('option');
  const values = [];

  for (let option of options)
    values.push(option.textContent);
  return values;
});

export async function getFieldSetParentAndValidate(t: TestController, fieldSetSelector: any) {
  await t
    .expect(await fieldSetSelector.legend.withText(fieldSetSelector.legendText).exists).eql(true)
    .expect(await fieldSetSelector.inputField.visible).eql(true)
    .expect(await fieldSetSelector.populateButton.visible).eql(true)

  // The below is an experiment and I'm not sure I will keep it.
  const closestParent = 0;
  const fieldSet = await fieldSetSelector
    .legend
    .withText(fieldSetSelector.legendText)
    .parent(closestParent);
  const fieldSetChildren = await fieldSet.child();
  await t
    .expect(await fieldSet.tagName).eql('fieldset')
    .expect(await fieldSetChildren.count).eql(fieldSetSelector.numberOfSelectors)

}