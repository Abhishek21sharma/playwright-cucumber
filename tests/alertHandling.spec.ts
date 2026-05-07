import { test, expect } from "@playwright/test";

test("Handling Alert @chromium", async ({ page }) => {
  await page.goto("https://www.selenium.dev/selenium/web/alerts.html#");

  // 1. Setup the listener
  page.on("dialog", async (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept(); // Clicks "OK"
  });

  // 2. Trigger the alert
  await page.locator("#alert").click();

  await expect(page.locator("www")).toBeVisible();
});
