Feature: Login functionality

  Scenario: User logs in successfully
    Given I open the login page
    When I fill in the username as "Heath93" and password as "s3cret"
    And I click the login button
    Then I should see the dashboard