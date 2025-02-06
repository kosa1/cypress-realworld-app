Feature: Home module payment notifications overview

  Background:
    Given I am logged in as "<username>" user with "s3cret" password

  Scenario: Count all payments and categorize into incomes and expenses
    When I fetch all available payments
    Then I should see the total number of payments
    And I should see the number of income payments
    And I should see the number of expense payments
    And the total number of payments should equal the sum of incomes and expenses

@only
Scenario: Filtering payments by amount range
    When I set amount range from "100" to "300"
    Then I should see the number of payments in the amount range
    And I should see the number of income payments
    And I should see the number of expense payments
