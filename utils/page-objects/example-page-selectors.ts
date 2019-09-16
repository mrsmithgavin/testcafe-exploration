import { Selector } from 'testcafe';
import {
  getPageUrl,
  getTextFromElement,
  getOptionsFromDropDown
} from './common';

export namespace ExamplePage {
  // Selectors are defined in the order they displayed on the page

  // Header
  export const h1: SelectorType = {
    selector: Selector('h1'),
    text: 'Example',
    // getText: (selector) => new Promise(resolve => {resolve(selector.textContent)})
    // getText: (selector) => {selector.textContent}
  };
  export const headingText: SelectorType = {
    selector: Selector('p'),
    text: 'This webpage is used as a sample in TestCafe tutorials.',
  };

  // Name
  export const developerNameFieldSet = {
    legend: Selector('legend'),
    legendText: 'Your name:',
    inputField: Selector('#developer-name'),
    populateButton: Selector('#populate'),
    // Add number of selectors so I can make assertions on it.
    // It would be nice if this could be generate at runtime.
    // This might push me down the class route
    numberOfSelectors: 3
  }

  // Features
  // Hmmmmmm, cant group think I wanted. It might be class time
  export const featuresFieldSet = {
    legend: Selector('legend'),
    legendText: 'Which features are important to you:',
  }

  export const remoteTesting: Checkbox = {
    labelText: 'Support for testing on remote devices',
    checkbox: Selector('#remote-testing')
  }

  export const reuse: Checkbox = {
    labelText: 'Re-using existing JavaScript code for testing',
    checkbox: Selector('#reusing-js-code')
  }

  export const testingType: Checkbox = {
    labelText: 'Running tests in background and/or in parallel in multiple browsers',
    checkbox: Selector('#background-parallel-testing')
  }

  export const ci: Checkbox = {
    labelText: 'Easy embedding into a Continuous integration system',
    checkbox: Selector('#continuous-integration-embedding')
  }

  export const trafficAnalysis: Checkbox = {
    labelText: 'Advanced traffic and markup analysis',
    checkbox: Selector('#traffic-markup-analysis')
  }

  // OS
  export const osFieldSet = {
    legend: Selector('legend'),
    legendText: 'What is your primary Operating System:',
  }

  export const windows: RadioButton = {
    labelText: 'Windows',
    radioButton: Selector('#windows')
  }

  export const macOS: RadioButton = {
    labelText: 'MacOS',
    radioButton: Selector('#macos')
  }

  export const linux: RadioButton = {
    labelText: 'Linux',
    radioButton: Selector('#linux')
  }

  // Interface
  export const interfaceFieldSet = {
    legend: Selector('legend'),
    legendText: 'Which TestCafe interface do you use:',
    dropDown: Selector('#preferred-interface'),
    options: ['Command Line', 'JavaScript API', 'Both']
  }

  // Tried TestCafe
  export const triedTestCafe: Checkbox = {
    labelText: 'I have tried TestCafe',
    checkbox: Selector('#tried-test-cafe')
  }

  // Slider
  export const sliderFieldSet = {
    legend: Selector('legend'),
    legendText: 'How would you rate TestCafe on a scale from 1 to 10',
    slider: Selector('#slider'),
    sliderHandle: Selector('.ui-slider-handle'),
    sliderValue: Selector('.slider-value'),
    sliderValues: [...Array(10 + 1).keys()].slice(1) // Slider values start at 1 and go to 10
  }

  // Comments
  export const commentsFieldSet = {
    legend: Selector('legend'),
    legendText: 'Please let us know what you think:',
    comments: Selector('#comments')
  }

  // Submit button
  export const submitButton = {
    button: Selector('#submit-button'),
    buttonText: 'Submit'
  }
  export const url = 'https://devexpress.github.io/testcafe/example/';

  export async function validateAllExpectedFieldsAreDisplayedAndHaveExpectedValues(t: TestController) {
    await t.expect(getPageUrl()).eql('https://devexpress.github.io/testcafe/example/');
    // Validate that the H1 and Heading text is displayed
    const tmp = await ExamplePage.h1.selector;
    await t
      .expect(await getTextFromElement(ExamplePage.h1.selector)).eql(ExamplePage.h1.text)
      .expect(await getTextFromElement(ExamplePage.headingText.selector)).eql(ExamplePage.headingText.text);

    // Validate fieldSet for name is displayed
    const developerNameFieldSet = ExamplePage.developerNameFieldSet;
    await t
      .expect(await developerNameFieldSet.legend.withText(developerNameFieldSet.legendText).exists).eql(true)
      .expect(await developerNameFieldSet.inputField.visible).eql(true)
      .expect(await developerNameFieldSet.populateButton.visible).eql(true);

    // Validate checkbox exists and label is correct for name
    await t
      .expect(await ExamplePage.remoteTesting.checkbox.exists).eql(true)
      .expect(await ExamplePage.remoteTesting.checkbox.parent(0).textContent)
      .eql(ExamplePage.remoteTesting.labelText);

    // Validate checkbox exists and label is correct for reuse
    await t
      .expect(await ExamplePage.reuse.checkbox.exists).eql(true)
      .expect(await ExamplePage.reuse.checkbox.parent(0).textContent)
      .eql(ExamplePage.reuse.labelText);

    // Validate checkbox exists and label is correct for testingType
    await t
      .expect(await ExamplePage.testingType.checkbox.exists).eql(true)
      .expect(await ExamplePage.testingType.checkbox.parent(0).textContent)
      .eql(ExamplePage.testingType.labelText);

    // Validate checkbox exists and label is correct for ci
    await t
      .expect(await ExamplePage.ci.checkbox.exists).eql(true)
      .expect(await ExamplePage.ci.checkbox.parent(0).textContent)
      .eql(ExamplePage.ci.labelText);

    // Validate checkbox exists and label is correct for trafficAnalysis
    await t
      .expect(await ExamplePage.trafficAnalysis.checkbox.exists).eql(true)
      .expect(await ExamplePage.trafficAnalysis.checkbox.parent(0).textContent)
      .eql(ExamplePage.trafficAnalysis.labelText);
    // Validate fieldSet for Operating System is displayed
    await t
      .expect(await ExamplePage.osFieldSet.legend
        .withText(ExamplePage.osFieldSet.legendText).exists).eql(true);

    // Validate radio button exists, label for and label is correct for Windows
    await t
      .expect(await ExamplePage.windows.radioButton.exists).eql(true)
      .expect(await ExamplePage.windows.radioButton.parent(0).textContent)
      .eql(ExamplePage.windows.labelText);
    // Validate radio button exists, label for and label is correct for MacOS
    await t
      .expect(await ExamplePage.macOS.radioButton.exists).eql(true)
      .expect(await ExamplePage.macOS.radioButton.parent(0).textContent)
      .eql(ExamplePage.macOS.labelText);

    // Validate radio button exists, label for and label is correct for Linux
    await t
      .expect(await ExamplePage.linux.radioButton.exists).eql(true)
      .expect(await ExamplePage.linux.radioButton.parent(0).textContent)
      .eql(ExamplePage.linux.labelText);

    // Validate fieldSet for Interface
    await t
      .expect(await ExamplePage.interfaceFieldSet.legend
        .withText(ExamplePage.interfaceFieldSet.legendText).exists).eql(true)
      .expect(await ExamplePage.interfaceFieldSet.dropDown.exists).eql(true);

    // Validate dropdown and options
    await t.expect(await ExamplePage.interfaceFieldSet.dropDown.find('option').count)
      .eql(ExamplePage.interfaceFieldSet.options.length);
    const dropDownID = await ExamplePage.interfaceFieldSet.dropDown.id;
    await t.expect(getOptionsFromDropDown('#' + dropDownID)).eql(ExamplePage.interfaceFieldSet.options);

    // Validate checkbox exists and label is correct for tried testcafe
    await t
      .expect(await ExamplePage.triedTestCafe.checkbox.exists).eql(true)
      .expect(await ExamplePage.triedTestCafe.checkbox.parent(0).textContent)
      .eql(ExamplePage.triedTestCafe.labelText);

    // Validate fieldSet for Slider
    await t
      .expect(await ExamplePage.sliderFieldSet.legend
        .withText(ExamplePage.sliderFieldSet.legendText).exists).eql(true)
      .expect(await ExamplePage.sliderFieldSet.slider.exists).eql(true)
      .expect(await ExamplePage.sliderFieldSet.sliderHandle.exists).eql(true);

    // Validate slider values
    const sliderValues = await ExamplePage.sliderFieldSet.sliderValue;
    await t.expect(await sliderValues.exists).eql(true);
    for (var i = 0; i < await sliderValues.count; i++) {
      await t.expect(await sliderValues.nth(i).textContent)
        .eql(ExamplePage.sliderFieldSet.sliderValues[i].toString());
    }

    // Validate fieldSet for Comments
    await t
      .expect(await ExamplePage.commentsFieldSet.legend
        .withText(ExamplePage.commentsFieldSet.legendText).exists).eql(true)
      .expect(await ExamplePage.commentsFieldSet.comments.exists).eql(true);

    // Validate submit button exists
    await t
      .expect(await ExamplePage.submitButton.button
        .withText(ExamplePage.submitButton.buttonText).exists).eql(true);
  }
}

export interface Checkbox {
  labelText: string;
  checkbox: Selector;
}

export interface SelectorType {
  selector: Selector;
  text: string;
  // getText: (selector) => any;
};

export interface RadioButton {
  labelText: string;
  radioButton: Selector;
}
