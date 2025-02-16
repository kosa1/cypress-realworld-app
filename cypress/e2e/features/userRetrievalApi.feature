Feature: User ID Retrieval from GraphQL

  Scenario: Login and retrieve user ID from GraphQL API
    Given I am logged in as "Heath93" user with "s3cret" password
    When I send a GraphQL query to "http://localhost:3001/graphql" to get the user ID
    Then I should receive a response with status code 200
    And I extract the user ID from the response
    And I log the user ID to the console
