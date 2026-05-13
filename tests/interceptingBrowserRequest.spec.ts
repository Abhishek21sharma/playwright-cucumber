import { test } from "@playwright/test";

test("This test is to intercept browser request and update it on flight", async ({
  page,
  request,
}) => {
  //click on the button here which calls the endpoint which we want to intercept
  //this  means that we will either take something from the response or even take the output here
  const articleResponse = await page.waitForResponse(
    "https://api-host-name:port/queryparam",
  );
  const articleResponseBody = await articleResponse.json();
  console.log(`slugID is: ${articleResponseBody.article.slugID}`);
});
