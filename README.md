# testcafe-exploration

## Installation instructions
- clone repository
- install dependencies. $npm i

## Run the tests:
- run all tests. $npm run test
- run tests for fast feedback. $npm run fast-tests
- run tests for slower feedback. $npm run slow-tests

## TODO:
- Move initial test to use new page framework
- Think about setting up in CI
- Think about changing to classes.
- Write up a doc explaining my choices. What I discovered with my approach.

## DONE:
- Add Scripts for different builds. Slow feedback and fast feedback


## Examples where a class would have been better

1. Being able to reference a just defined selector in subsequent properties of an object.
    Like the below. I wanted to use the selector and parse it to getText.

    ```ts
    export const h1: SelectorType = {
        selector: Selector('h1'),
        text: 'Example',
        getTextTry1: (selector) => new Promise(resolve => {resolve(selector.textContent)}),
        getTextTry2: (selector) => {selector.textContent}
    };
    ```

    I parsed the selector from outside into the function but it was very verbose as
    it needed to have the selector twice. See below.
    ```ts
    await t.expect(Page.h1.selector.getText(Page.h1.selector)).eql('some value');
    ```

    I settled on another approach which was defining a common method to get textContent
    by passing through the selector. It changes the flow of the test a little,
    but I felt it was much nicer than repeating selectors in the same line of code. See below:

    ```ts
    export async function getTextFromElement(element: Selector) {
    return element.textContent
    };

    await t
    .expect(await getTextFromElement(Page.headingText.selector))
        .eql(Page.headingText.text)
    ```

2. I wanted to perform a filter or reduce on a namespace object that would return everything
    of a specific type. Like all parameters that are of type Selector. This would have allowed
    me to do a check just parsing this to a function. Instead of hard coding 'numberOfSelectors: 3' in the object.

    Similar to using instanceof. This would have been easy if I utilized classes for my page objects.

3. Being able to construct or pass through a developer name in the ThankYouPage object.           Something like:

    ```ts
    export const h1 = {
        selector: Selector('#article-header'),
        defaultText: 'Thank you!',
        thankYouWithName: 'Thank you, ' + developerName ,'!'
    };

    ThanYouPage.h1.thankYouWithName(developerName)
```

I ended up creating a separate function to help out:

```ts
  export const h1 = {
    selector: Selector('#article-header'),
    defaultText: 'Thank you!',
    thankYouTextPart1: 'Thank you, ',
    thankYouTextPart2: '!'
  };

  export async function validateThankYou(t, name?: string) {
    const thankYouToCheck = name ? h1.thankYouTextPart1 + name + h1.thankYouTextPart2 : h1.defaultText 
    await t.expect(await h1.selector.textContent).eql(thankYouToCheck);
  }
```
