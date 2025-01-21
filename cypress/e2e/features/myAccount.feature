Feature: My Account Module

  Scenario: Clear entire form in My Account module
    Given I am logged in as "Heath93" user with "s3cret" password
    When I navigate to the "My Account" module
    And I clear the entire form
    Then the form fields should be empty
