import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Browser, Page, expect } from "@playwright/test";
import { pageFixture } from "../hooks/pagefixture";

// let browser: Browser;
// let page: Page;

Given("I am on the login page", async function () {
  await pageFixture.page.goto("https://conduit.bondaracademy.com/");
  await pageFixture.page.getByText(" Sign in ").click();
  console.log("Navigating to login page");
});

When("I login with valid credentials", async function () {
  await pageFixture.page
    .getByPlaceholder("Email")
    .fill("Abhi21sharma@test.com");
  await pageFixture.page.getByPlaceholder("Password").fill("abhi@test");
  await pageFixture.page.locator('button[type="submit"]').click();
  console.log("Logging in with valid credentials");
});

When("I click on the setting button", async function () {
  await pageFixture.page.locator('a[href="/settings"]').click();
  console.log("Clicking settings button");
});

When("I click on the logout button", async function () {
  await pageFixture.page.getByText("Or click here to logout.").click();
  console.log("Clicking logout button");
});

Then("I am back to the login page", async function () {
  await expect(pageFixture.page.getByText(" Sign in ")).toBeVisible();
  //await browser.close();
  console.log("Verifying login page");
});
