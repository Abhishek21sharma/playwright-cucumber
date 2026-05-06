import { test, expect } from "@playwright/test";

test("Test1 @chromium", async ({ page }) => {
  await page.goto(
    "https://www.geeksforgeeks.org/java/difference-between-and-equals-method-in-java/",
  );
  await expect(page.getByText(" Method in Java")).toBeVisible();
});

test("Test2 @chromium", async ({ page }) => {
  await page.goto("https://www.youtube.com/");
  await expect(page.locator("#container #start")).toBeVisible();
  await page.locator("#container #start").click();
});

test("Test3 @chromium", async ({ page }) => {
  await page.goto(
    "https://www.google.com/search?q=weather&oq=&gs_lcrp=EgZjaHJvbWUqCQgAECMYJxjqAjIJCAAQIxgnGOoCMgkIARAjGCcY6gIyCQgCECMYJxjqAjIJCAMQIxgnGOoCMgkIBBAjGCcY6gIyCQgFECMYJxjqAjIJCAYQIxgnGOoCMgkIBxAjGCcY6gLSAQsyNDI3MzMzajBqN6gCCLACAfEFMCFf6eXToeHxBTAhX-nl06Hh&sourceid=chrome&ie=UTF-8",
  );
  await expect(page.locator(".name")).toBeVisible();
});

test("Test4 @chromium", async ({ page }) => {
  await page.goto(
    "https://www.google.com/search?q=ipl+live+score&oq=ipl&gs_lcrp=EgZjaHJvbWUqDAgCECMYJxiABBiKBTIHCAAQABiPAjISCAEQLhhDGIMBGLEDGIAEGIoFMgwIAhAjGCcYgAQYigUyEggDEAAYQxiDARixAxiABBiKBTIMCAQQLhhDGIAEGIoFMhIIBRAAGEMYgwEYsQMYgAQYigUyEggGEAAYQxiDARixAxiABBiKBTISCAcQABhDGIMBGLEDGIAEGIoFMgwICBAAGEMYgAQYigUyEggJEAAYQxiDARixAxiABBiKBdIBCDMwODhqMGo3qAIIsAIB8QWBFKyizn2k5g&sourceid=chrome&ie=UTF-8",
  );
  await expect(page.locator(".team-name")).toBeVisible();
});

test("Test5 @firefox", async ({ page }) => {
  await page.goto(
    "https://www.geeksforgeeks.org/java/difference-between-and-equals-method-in-java/",
  );
  await expect(page.locator(" Method in Java")).toBeVisible();
});

test("Test6 @firefox", async ({ page }) => {
  await page.goto("https://www.youtube.com/");
  await expect(page.locator("#container #start")).toBeVisible();
});

test("Test7 @firefox", async ({ page }) => {
  await page.goto(
    "https://www.google.com/search?q=weather&oq=&gs_lcrp=EgZjaHJvbWUqCQgAECMYJxjqAjIJCAAQIxgnGOoCMgkIARAjGCcY6gIyCQgCECMYJxjqAjIJCAMQIxgnGOoCMgkIBBAjGCcY6gIyCQgFECMYJxjqAjIJCAYQIxgnGOoCMgkIBxAjGCcY6gLSAQsyNDI3MzMzajBqN6gCCLACAfEFMCFf6eXToeHxBTAhX-nl06Hh&sourceid=chrome&ie=UTF-8",
  );
  await expect(page.locator(".name")).toBeVisible();
});

test("Test8 @webkit", async ({ page }) => {
  await page.goto(
    "https://www.google.com/search?q=weather&oq=&gs_lcrp=EgZjaHJvbWUqCQgAECMYJxjqAjIJCAAQIxgnGOoCMgkIARAjGCcY6gIyCQgCECMYJxjqAjIJCAMQIxgnGOoCMgkIBBAjGCcY6gIyCQgFECMYJxjqAjIJCAYQIxgnGOoCMgkIBxAjGCcY6gLSAQsyNDI3MzMzajBqN6gCCLACAfEFMCFf6eXToeHxBTAhX-nl06Hh&sourceid=chrome&ie=UTF-8",
  );
  await expect(page.locator(".name")).toBeVisible();
});

test("Test9 @webkit", async ({ page }) => {
  await page.goto("https://www.youtube.com/");
  await expect(page.locator("#container #start")).toBeVisible();
});

test("Test10 @webkit", async ({ page }) => {
  await page.goto(
    "https://www.geeksforgeeks.org/java/difference-between-and-equals-method-in-java/",
  );
  await expect(page.locator(" Method in Java")).toBeVisible();
});
