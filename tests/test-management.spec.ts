//this test will use the test-management data and update it
import articleRequestPayload from "../test-management/POST-article.json";

import { test } from "@playwright/test";

test("update and do POST request", async ({ request }) => {
  await request.post("https:/www.api-url.com/", {
    data: articleRequestPayload,
  });

  //now let's say we want to update some fields and send an updated r
  //request
  //in java world we need to serialize it using POJO classes with
  //getter & setter methods but here it happens automatically
  //since JSON is essentially JavaScriptObjectNotation..

  //updating title::
  articleRequestPayload.article.title = "this is an updated title";
  //now we don't have de-serialize it or save the object and store
  //in a new variable, all happens automatically ..
  //it means , variable 'articleRequestPayload' holds the
  //updated version of title now...

  await request.post("https://updated-endpoint.com/", {
    data: articleRequestPayload, //this is having updated title
  });
});

test("update in better way", async () => {
  //since if we update the way we did above (updated title for the entire object)
  //so any other test in this file which might need that object, for them as wel
  //the title is updated now , since we updated at global level

  //to solve this we need to create a custom copy of each object
  //and then do the update

  //get the object and convert to string and then parse again to JSON
  const articleRequest = JSON.parse(JSON.stringify(articleRequestPayload));
  //now update just this and use in POST

  articleRequest.article.title = "updated title";
});
