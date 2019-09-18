import { Selector, t, ClientFunction } from 'testcafe';
import { ExamplePage } from '../../../utils/page-objects/example-page-selectors';
import { getPageUrl, getPseudoRandomNumber } from '../../../utils/page-objects/common';
import { ThankYouPage } from '../../../utils/page-objects/thank-you-page';

fixture`TestCafe Example Page`
  .page(ExamplePage.url);

test('Perform search and validate expected result found', async t => {

  const developerNameText = 'TestCafe Woot';
  const defaultDeveloperNameText = 'Peter Parker'

  // Verify Route
  await t.expect(getPageUrl()).eql(ExamplePage.url);

  // Configure test to handle dialogs
  await t
    .setNativeDialogHandler(() => true)

  // Interact with developer-name input field
  const developerNameFieldSet = ExamplePage.developerNameFieldSet;
  await t
    .typeText(await developerNameFieldSet.inputField, developerNameText)
    .expect(developerNameFieldSet.inputField.value).eql(developerNameText)
    .click(await developerNameFieldSet.populateButton)
    .expect(developerNameFieldSet.inputField.value).eql(defaultDeveloperNameText)

  // Deal with alert and perform some expectations on the contents
  const history = await t.getNativeDialogHistory();
  await t
    .expect(history[0].type).eql('confirm')
    .expect(history[0].text).eql('Reset information before proceeding?')
    .expect(Selector('#developer-name').value).notEql(developerNameText)

  // Interact with checkboxes
  await t.click(ExamplePage.remoteTesting.checkbox);
  await t.click(ExamplePage.reuse.checkbox);
  await t.click(ExamplePage.testingType.checkbox);
  await t.click(ExamplePage.ci.checkbox);
  await t.click(ExamplePage.trafficAnalysis.checkbox);

  // Interact with radio buttons
  await t.click(ExamplePage.linux.radioButton)

  // Interact with drop down menu
  const preferredInterfaceDropDown = ExamplePage.interfaceFieldSet.dropDown;
  const interfaceOption = preferredInterfaceDropDown.find(ExamplePage.interfaceFieldSet.option);
  const itemToSelect = getPseudoRandomNumber(0, ExamplePage.interfaceFieldSet.options.length - 1);
  const interfaceOptionToSelect = ExamplePage.interfaceFieldSet.options[itemToSelect];
  await t
    .click(preferredInterfaceDropDown)
    .click(interfaceOption.withText(ExamplePage.interfaceFieldSet.options[itemToSelect]))
    .expect(preferredInterfaceDropDown.value).eql(interfaceOptionToSelect);

  // 'Tried' checkbox
  await t.click(ExamplePage.triedTestCafe.checkbox);

  // Interact with slider
  const slideTo = getPseudoRandomNumber(0, await ExamplePage.sliderFieldSet.slider.clientWidth);
  console.log('slideTo', slideTo)
  await t.drag('.ui-slider-handle', slideTo, 0, { offsetX: 10, offsetY: 10 });

  // Interact with textarea
  await t.typeText(ExamplePage.commentsFieldSet.comments, "This is some text to input.");

  // Interact with button
  await t.click(ExamplePage.submitButton.button);

  // After submit, app will display confirmation page
  // - check route
  await t.expect(getPageUrl()).eql(ThankYouPage.url);
  // Validate expected outcomes
  const articleHeaderElement = await ThankYouPage.h1.selector
  ThankYouPage.validateThankYou(t, defaultDeveloperNameText);
  await t.expect(await ThankYouPage.headingText.selector.textContent)
    .eql(ThankYouPage.headingText.text);
  await t.expect(await ThankYouPage.testcafeLink.selector.getAttribute('href'))
    .contains(ThankYouPage.testcafeLink.href);
});
