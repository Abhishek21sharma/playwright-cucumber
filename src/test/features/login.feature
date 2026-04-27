Feature: Conduit Login Functionality

Scenario: Login and Logout with valid credentials
Given I am on the login page
When I login with valid credentials
And I click on the setting button
And I click on the logout button
Then I am back to the login page