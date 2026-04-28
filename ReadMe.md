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
