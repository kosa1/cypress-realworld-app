Feature: My Account Module

  Background:
    Given I am logged in as "Heath93" user with "s3cret" password

  Scenario: Clear entire form in My Account module
    When I navigate to the "My Account" module
    And I clear the entire form
    Then the form fields should be empty

  Scenario: Fill in valid data and save the form
    When I navigate to the "My Account" module
    And I fill in the following valid data:
      | Field        | Value              |
      | name         | Bob               |
      | surname      | Doe                |
      | email        | Bob.doe@gmail.com |
      | phoneNumber  | 48123456789       |
    And I save the form
    Then the form fields should display:
      | Field        | Value              |
      | name         | Bob               |
      | surname      | Doe                |
      | email        | Bob.doe@gmail.com |
      | phoneNumber  | 48123456789       |
    And a "checkAuth" request should be sent with status code 200
@only
  Scenario: Fill in invalid data and save the form
    When I navigate to the "My Account" module
    And I fill in the following invalid data:
      | Field        | Value              |
      | name         |                    |
      | surname      |                    |
      | email        | john.doe@.com      |
      | phoneNumber  | 12345              |
    Then I should see the following validation errors:
      | Field        | Error Message       |
      | firstName    | Enter a first name|
      | lastName     | Enter a last name |
      | email        | Must contain a valid email address |
      | phoneNumber  | Phone number is not valid |
    And the "Save" button should be inactive
