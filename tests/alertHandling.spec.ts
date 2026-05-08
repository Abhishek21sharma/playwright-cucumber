import { test, expect } from "@playwright/test";

test("Handling Alert @chromium", async ({ page }) => {
  //await page.goto("https://www.selenium.dev/selenium/web/alerts.html#");

  //can be handled by using page listners
  //by default  - playwright will cancel the dialouge box(alert, prompts , confirms)

  //before the click which will open the dialog, start the page listner using 'page.on('dialog')

  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  //start the listner here
  // This defines the "Behavior" for when a dialog appears

  //check also the difference between these two listners..
  //page.on("dialog");
  //page.waitForEvent("");

  page.on("dialog", async (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);

    //verify the msg
    expect(dialog.message()).toBe("I am a JS Alert");

    // Accept the dialog (Click "OK")
    // Use dialog.dismiss() for "Cancel" or dialog.accept('text') for Prompts
    await dialog.accept();

    // 3. Click the button that opens the alert
    // Note: We don't need Promise.all here because the listener
    // is already "attached" and waiting.
    await page.getByRole("button", { name: "Click for JS Alert" }).click();

    // 4. Verify the result on the page after the dialog is closed

    const result = page.locator("#result");
    await expect(result).toHaveText("You successfully clicked an alert");

    //await page.locator(".na").click();

    //to note: if we just want to listen to the event just once then, use page.once()
  });
});
