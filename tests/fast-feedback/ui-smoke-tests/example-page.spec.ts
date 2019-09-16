import { Selector, t, ClientFunction } from 'testcafe';
import { ExamplePage } from '../../../utils/page-objects/example-page-selectors';
import { getFieldSetParentAndValidate } from '../../../utils/page-objects/common';
import {
  getPageUrl,
  getTextFromElement,
  getOptionsFromDropDown
} from '../../../utils/page-objects/common';

// import { ExamplePageSelectors } from '../../../utils/page-objects/example-page-selectors';

fixture`Example Page - UI Smoke tests`
  .page(ExamplePage.url);

test('Validate all expected fields are displayed', async t => {
  // Hide away the really long test
  await ExamplePage.validateAllExpectedFieldsAreDisplayedAndHaveExpectedValues(t);
})

test('Validate the slider and comments are disabled and are toggled on correctly when the tried Testcafe checkbox is checked', async t => {
  // Validate the slider is disabled
  let classNameArray: string[] = await ExamplePage.sliderFieldSet.slider.classNames;
  await t
    .expect(classNameArray.includes('ui-slider-disabled')).ok('ui-slider-disabled class is on slider')
    .expect(classNameArray.includes('ui-state-disabled')).ok('ui-state-disabled class is on slider');

  // Validate comments are disabled
  await t.expect(await ExamplePage.commentsFieldSet.comments.hasAttribute('disabled')).ok();

  // Perform action that toggles slider to an enable state
  await t.click(ExamplePage.triedTestCafe.checkbox);

  // Validate the slider is enable
  classNameArray = await ExamplePage.sliderFieldSet.slider.classNames;
  await t
    .expect(classNameArray.includes('ui-slider-disabled')).notOk('ui-slider-disabled class should not be slider')
    .expect(classNameArray.includes('ui-state-disabled')).notOk('ui-state-disabled class should not be slider');

  // Validate comments are enable
  await t.expect(await ExamplePage.commentsFieldSet.comments.hasAttribute('disabled')).notOk();

  // Perform action that toggles fields back to disabled states
  await t.click(ExamplePage.triedTestCafe.checkbox);

  // Validate the slider is disabled
  classNameArray = await ExamplePage.sliderFieldSet.slider.classNames;
  await t
    .expect(classNameArray.includes('ui-slider-disabled')).ok('ui-slider-disabled class is on slider')
    .expect(classNameArray.includes('ui-state-disabled')).ok('ui-state-disabled class is on slider');

  // Validate comments are disabled
  await t.expect(await ExamplePage.commentsFieldSet.comments.hasAttribute('disabled')).ok();
})

test('Validate submit button is disabled and is toggled on correctly when name input is filled out', async t => {
  // Validate the submit button is disabled
  await t.expect(await ExamplePage.submitButton.button.hasAttribute('disabled')).ok();

  // Perform action that toggles submit button to an enable state
  await t.typeText(ExamplePage.developerNameFieldSet.inputField, 'a');

  // Validate the submit button is enabled
  await t.expect(await ExamplePage.submitButton.button.hasAttribute('disabled')).notOk();

  // Perform actions that toggle fields back to disabled states
  await t.click(ExamplePage.developerNameFieldSet.inputField).pressKey('ctrl+a delete');

  // Validate the submit button is disabled
  await t.expect(await ExamplePage.submitButton.button.hasAttribute('disabled')).ok();
})