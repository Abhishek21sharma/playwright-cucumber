Feature: POST Request updates

Scenario: Post request details
Given I am on the login page
When I login with valid credentials
And I click on new POST button
And I fill up the require details
Then I should see the article posted