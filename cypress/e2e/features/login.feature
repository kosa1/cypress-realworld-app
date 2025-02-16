Feature: Login functionality

  Scenario: User logs in successfully
    Given I open the login page
    When I fill in the username as "Heath93" and password as "s3cret"
    And I click the login button
    Then I should see the dashboard

    Scenario: User logs in successfully via API
    Given I log in using the API with username "Heath93" and password "s3cret"
    When I open the dashboard page
    Then I should see the dashboard