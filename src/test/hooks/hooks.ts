import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pagefixture";

let browser: Browser;
let page: Page;
let context: BrowserContext;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function () {
  context = await browser.newContext();
  page = await browser.newPage();
  // @ts-ignore
  pageFixture.page = page;
});

After(async function ({ pickle, result }) {
  if (result?.status == Status.FAILED) {
    const img = pageFixture.page.screenshot({
      path: `./test-result/screenshots/${pickle.name}.png`,
      type: "png",
    });

    //to attach the screenshot to the cucumber report-
    await this.attach(img, "img/png");
  }

  await page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
