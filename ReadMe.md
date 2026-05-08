we dowunloaded cucumber using npm i -D @cucumber/cucumber
note: by default cucumber expects : js files and not ts files
so we need to a converter as we will be writing our scripts to ts only download: npm i -D ts-node

Look at the folder structure we have created for cucumber under "src/tes/feature and tests"
this is not the default location, so we need to tell the compiler about the location, cucumber will look into "cucumber.json" and then go to the location to work
(look for "requireModule": ["ts-node/register"] -> this will do the conversion)

The run command will be added in the "scripts" part of package.json:
"test": "cucumber-js test"
(we are running using cucumber-js)

tsconfig.json -> specify the compilerModule version here to fix the cucumber syntax error
now to run a sample feature file: npm run test
check carefully cucumber.js how did we map each bits and piece (features wth step defs)

sharing page state:
we have to create a new page for every feature normally, but we can create it once and share it for
all the features..

check how to link from keyboard to feature, such as when we press control and then it should
go to the feature file: 'press control + , : it will open the settings and then search for
cucumber'. It should then be able to update the link between the two

to run a particular (individual feature file): add that file name (or tag it) , in the cucumber.json and cucumber.js file..

sharing page state is from Hooks ..
Before & After --> it holds the page state and thus shared to all pages.. no need of each page
to create their own copy of the pages

check how a 'context' belongs to a page and how to work with them..
cucumber after method have params which have info about what 'test run' has used config wise
all of them are stored in 'result' and 'pickle' , this is similar to 'testinfo' in another test() method
For better reporting use/download : npm i -D multiple-cucumber-html-report
(also update the cucumber.json file --> format)
(before this: working format: //"format": ["progress-bar", "html:cucumber-report.html"],)
need to add custom logic for that to bring to live: go to their official github page and copy their code. It's similar to we add extent report so we need to do/add slight adjustments.
once all set: run : npx ts-node ./file_name.ts

also check how we create 'script' dependencies in package.json.
to note: for every 'test' command , node will automatically go and sees if 'pretest' phase exists
and run it before. But we need to explicity call posttest.
also we used rimraf and mkdir : these pkgs helps to delete and create dir.
to note: all of the scripts we added works with multiple-cucumber-html-report, which is not yet added

Also, this framework works with pageFixture
but we can use 'WorldConstructor' as well , which is using 'this'
this.page --> this concept is explained in another frameworks check that too...

also cucumber.json: along with the report :
format: [
"rerun: @rerun.txt"
]

to re-run re-tests features: updated the scripts..

note:everything controls from cucumber.json file (or cucumber.js file) and not from playwright.config.ts since we changed it's behaviour..
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
To run the tests from command line:
npx playwright test --headed --workers=10

to run 1 particular test
npx playwright test "alertHandling.spec.ts" -g "Handling\s+Alert\s+@chromium$"

Parallelism scenario based question::
How to run let's say 10 tests in parallel across different available browsers
so that 4 of them run in parallel in chromium and 3 of them run in parallel in firefox
and rest 3 in safari webkit and all 3 browser do the execution in parallel

Answer::
The industry standard for handling multiple browsers in parallel is using Projects. You don't want to manually manage 10 different contexts in a single script; you want the Playwright Test Runner to handle the worker allocation for you.
(check the playwright.config.ts file for the details..)
Theory:
Playwright automatically creates a Context and a Page for every single test. This is the "Best Practice" design because it prevents state leakage (like cookies or cache) between your 10 tests.

Explaination:
Workers: Playwright spins up OS-level processes called Workers. If you set workers: 10, Playwright launches 10 processes.

Parallelism: Each worker executes one test at a time. Within that worker, Playwright creates a new BrowserContext for that test.

Why not manual Contexts? In older frameworks, you might manually create 10 contexts in one script. In Playwright, this is an anti-pattern. If one test crashes the process, it kills all 10. By using the Config/Project method, if one worker fails, the others continue unaffected.

Strategic Recommendation: Is this the best way?
While your 4/3/3 split is technically achievable via testMatch or Test Tags, it is rarely the most efficient way to handle a real-world project.

The "Real World" Problem
In a 10+ year experience context, you'll find that maintaining three separate groups of tests based on the browser is high-maintenance. If a feature changes, you have to update the Chromium test, the Firefox test, and the WebKit test separately.

The Professional Solution: Cross-Browser Matrix
Usually, we want all tests to run against all browsers to ensure compatibility.
Define 3 projects (Chromium, Firefox, WebKit).
Point them all to the same test suite.
Let the CI/CD pipeline (GitHub Actions/Jenkins) handle the parallelism.
If a specific test is "Chromium only," use test.skip() or tags within the code:
so, industry standard is to create 3 jobs - 1 for each browser type
and each job will run in parallel based on the worker count etc
this is the easiest way to handle it as by the end of 30 mins (if a single suite runs for 30 mins)
we will have all 3 jobs completed in parallel and we ensure coverage is full

also another bit is, if the test suite is very very big lets say 1k tests,
we can consider using sharding..
npx playwright test --project=chromium --shard=1/3
npx playwright test --project=chromium --shard=2/3
npx playwright test --project=chromium --shard=3/3
This splits the 1,000 tests across 3 different machines for just the Chromium project.

Third-Party Grid (BrowserStack / SauceLabs)
Instead of managing Jenkins agents with different browsers installed, your code points to a remote URL.
Pros: You don't have to maintain the browsers or the OS. You get instant access to 100+ parallel "slots."
Cons: Expensive and can be slightly slower due to network latency.

Summary:
The goal is "Write Once, Run Everywhere."
a.Keep tests browser-agnostic.
b.Use the playwright.config.ts to define the browsers.
c.Use CI Matrix orchestration to split the load across different hardware nodes. This ensures that a resource-heavy test in Chrome doesn't slow down a sensitive test in WebKit.

<<<<<<<<------------------------------->>>>>>>>
handling dialogues (alerts, confirms, prompts) using playwright..
By default, Playwright automatically dismisses all dialogues so your test doesn't get stuck.
to add this use playwright 'listner': using page.on('dialog', )
if we want to listen just once and then stop the listner use: page.once('dialog', ...)
as page.on() keeps listing until the page stays in.
(check alertHandling.spec.ts file)

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

question: why to use promise.all() for handling windows and actioning event listner and action inside it
but for dialog : we start the listner first and then in seperate line do the next actions
answer:
it touches on the core difference between how Playwright handles Browser Events (like opening a window) versus JavaScript Execution Events (like a dialog box).

1. The "Object Reference" Problem (Identity)
   When an alert pops up, it doesn't create a new world; it just pauses the current page. You don't need a new variable to "control" the alert; you just need to tell the browser how to react to it.
   When a new window opens, Playwright creates an entirely new Page object.
   If you use a listener (page.on('popup')), the new page is "born" inside a callback function.Getting that new page out of that listener and back into your main test flow is messy and requires extra variables.
   messy way::
   let newPage; // External variable needed
   page.on('popup', p => newPage = p);

await page.click('#open');
// Now you have to 'poll' or wait to make sure newPage isn't undefined anymore
await newPage.goto(...);

    clean way:
    // The newPage is returned directly to your main flow
    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('#open')
    ]);

That is an excellent observation. It touches on the core difference between how Playwright handles Browser Events (like opening a window) versus JavaScript Execution Events (like a dialog box).

The short answer: Technically, you could use a listener for windows, but it makes your code harder to read and prone to "Identity Confusion."

Here is the detailed breakdown of why Promise.all is the preferred standard for windows, while .on('dialog') is the standard for alerts.

1. The "Object Reference" Problem (Identity)
   When an alert pops up, it doesn't create a new world; it just pauses the current page. You don't need a new variable to "control" the alert; you just need to tell the browser how to react to it.

When a new window opens, Playwright creates an entirely new Page object.

If you use a listener (page.on('popup')), the new page is "born" inside a callback function.

Getting that new page out of that listener and back into your main test flow is messy and requires extra variables.

The "Messy" Listener Way:

TypeScript
let newPage; // External variable needed
page.on('popup', p => newPage = p);

await page.click('#open');
// Now you have to 'poll' or wait to make sure newPage isn't undefined anymore
await newPage.goto(...);
The "Clean" Promise.all Way:

TypeScript
// The newPage is returned directly to your main flow
const [newPage] = await Promise.all([
context.waitForEvent('page'),
page.click('#open')
]); 2. Blocking vs. Non-Blocking
Dialogs (Alerts) are "Modal": They freeze the browser. The moment they appear, the click() action technically hasn't "finished" because the browser is stuck. Playwright's page.on('dialog') is a background worker that handles this freeze immediately.

Windows are "Non-Blocking": The original page keeps running. The click() action that opens a window finishes almost instantly.
