import { Selector, t } from 'testcafe';

const developerNameInput = Selector('#developer-name');

async function sleep(ms = 2000) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

fixture `TestCafe Example Page`   
  .page `https://devexpress.github.io/testcafe/example/`;

test('Perform search and validate expected result found', async t => {

  const developerNameText = 'TestCafe Woot';

  // Verify Route

  // Check H1 and accompanying
    // H1 in h1 tag and accompanying in P

  
  // Configure test to handle dialogs
  await t
    .setNativeDialogHandler(() => true)

  // Interact with developer-name input field
  await t
    .typeText(Selector('#developer-name'), developerNameText)
    .expect(developerNameInput.value).eql(developerNameText)
        .click(Selector('#populate'));
   
  // Deal with alert and perform some expectations on the contents
  const history = await t.getNativeDialogHistory();
  await t
      .expect(history[0].type).eql('confirm')
      .expect(history[0].text).eql('Reset information before proceeding?')
      .expect(Selector('#developer-name').value).notEql(developerNameText)

  // "column col-1": fieldset 2, I wonder if I can use some filtering
    //  - Which features are important to you:

  // Interact with checkboxes
  await t.click(Selector('#remote-testing'))


  // "column col-2": field set 1: What is your primary Operating System:
  // Interact with radio buttons
  await t.click(Selector('#macos'))

  // "column col-2": field set 2: Which TestCafe interface do you use:
  // Interact with drop down menu

  const preferredInterfaceDropDown = Selector('#preferred-interface');
  const interfaceOption = preferredInterfaceDropDown.find('option')
  const interfaceOptionToSelect = 'Both'
  await t
    .click(preferredInterfaceDropDown)
    .click(interfaceOption.withText(interfaceOptionToSelect))
    .expect(preferredInterfaceDropDown.value).eql(interfaceOptionToSelect)


  // 'form-bottom':   How would you rate TestCafe on a scale from 1 to 10
  // 'Tried' checkbox
  await t.click(Selector('#tried-test-cafe'))

  // Interact with slider
  const slider = await Selector('#slider');
  const clientWidth = await slider.clientWidth;

  const numberRange = {min: 1, max: 10}
  const pseudoRandomNumber = Math.floor(Math.random() * numberRange.max) + numberRange.min;
  const slideTo = Math.floor(clientWidth / numberRange.max);
  await t.drag('.ui-slider-handle', slideTo, 0, { offsetX: 10, offsetY: 10 })

  // Interact with textarea

  // Interact with button

  // After submit, app will display confirmation page
  // - check route
  // - perform validations

})