import { test, expect } from "@playwright/test";

test("multiple windows handling ", async ({ page, context }) => {
  //In Playwright, handling multiple windows (or tabs) is handled through
  // the concept of Pages within a BrowserContext.
  //  Unlike older frameworks that require "switching focus" commands,
  // Playwright allows you to hold references to multiple page objects simultaneously
  // and interact with them asynchronously.
  //concept and details::
  //In Playwright, every tab is a Page.
  //When a button opens a new tab,
  //you must "catch" that new page object using an event listener.
  //1. Setup the Event Listener
  //The trick to a stable E2E flow is to start listening for the popup event
  // before you perform the action that triggers it.
  // This prevents race conditions where the window opens before the code is ready to capture it.
  //2.Trigger the Action
  //Perform the click that opens the new window.
  //3Capture the New Page
  //Wait for the promise to resolve, which gives you a new Page object representing the second window
  //4. Interaction and Return
  //Since you have both the page (original) and newPage (second) objects, you don't need to "switch" back and forth. You simply call methods on whichever object you need.

  // Step 1: Open the initial URL
  await page.goto("https://your-app.com/dashboard");

  // Step 2: Set up the listener for the 'popup' (new window)
  // We use Promise.all to ensure the click and the popup capture happen concurrently

  //details of the return type here and why to use promise.all() is detailed below
  //we are using array de-structuring here..
  const [newPage] = await Promise.all([
    context.waitForEvent("page"), // Wait for the new page/tab to be created
    page.getByRole("button", { name: "Open Settings" }).click(), // Action that opens the tab
  ]);

  // Step 3: Wait for the new window to load its content
  await newPage.waitForLoadState();
  console.log("New Window URL:", newPage.url());

  // Optional: Close the second window if it's no longer needed
  await newPage.close();

  //Step 5: "Return" to the original window
  // In Playwright, you simply start using the original 'page' object again.
  // There is no 'switchToDefaultContent' equivalent needed.
  await page.getByRole("button", { name: "Refresh Dashboard" }).click();

  const status = page.locator("#status-message");
  await expect(status).toHaveText("Updated successfully");

  //Best practices:: use of event listner here
  //context.waitForEvent('page') captures any new tab opened within that browser session.
  //page.waitforEvent('popup')  specifically captures a window opened by that specific page.
  // Usually, context is safer for E2E.

  //Promise.all Pattern:
  // This is the "Clean Code" way in Playwright/JS.
  //  If you click first and then try to wait for the page,
  //  the page might have already opened and the event might be missed, leading to a timeout.

  //managing multiple pop-ups:::
  //here promise.all([]) --> it returns the array of all the pages..
  const [page1, page2] = await Promise.all([
    context.waitForEvent("page"),
    context.waitForEvent("page"),
    page.click("#open-two-tabs"),
  ]);

  //important to note:
  //Promise.all structure is the professional standard

  //technically following concepts are possible, but they will lead to race conditions and flaky tests
  //// ❌ HIGH RISK OF TIMEOUT
  //await page.getByRole('button').click(); // The window might open and finish loading here...
  //const newPage = await context.waitForEvent('page'); // ...before this line even starts listening!

  //// ❌ POTENTIAL FOR FLAKINESS
  //const newPagePromise = context.waitForEvent('page');
  //await page.getByRole('button').click();
  //const newPage = await newPagePromise;

  //The "Playwright Way": Concurrent Execution
  //To ensure you never miss the event, you use Promise.all.
  // This tells the code: "Start listening for the window AND click the button at the same time.
  //  Don't move to the next line until both are finished."

  //IMPORTANT ON the return type for Promise.all()
  const [newPage1] = await Promise.all([
    context.waitForEvent("page"),
    page.locator(".name").click(),
  ]);

  //Promise.all returns an Array containing the results of all promises passed to it.

  //The first item in that array is the result of context.waitForEvent('page') (which is the Page object).

  //The second item is the result of the .click() (which is usually void or null).

  //[newPage] is "Array Destructuring." It’s a shortcut to say: "Take the first item out of the resulting array and name it newPage."

  //Summary Checklist
  //Use context.waitForEvent('page') if any action in the browser might open a tab.
  //Use page.waitForEvent('popup') if you want to be specific to that one tab.
  //Always wrap in Promise.all to avoid the race condition where the window opens faster than your script can react.
});
