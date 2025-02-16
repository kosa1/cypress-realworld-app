Feature: New Payment Process

  Background:
    Given I am logged in as "<username>" user with "s3cret" password

  Scenario: Successful money transfer between users
    Given I have sufficient balance in the account
    When I navigate to the transfer page by clicking the "$NEW" button
    And I select "<contactName>" as the contact
    And I enter an amount of "1"
    And I type "This is demo Note!" as a note
    And I click the "Pay" button
    Then a message with "Transaction submitted!" appears
    And the balance is decreased by ""

#   Scenario: Successful money request between users
#     When I navigate to the transfer page by clicking the "$NEW" button
#     And I select "<contactName>" as the contact
#     And I enter an amount of "$100"
#     And I type "<note>" as a note
#     And I click the "Request" button
#     Then a message with "Transaction submitted!" appears
