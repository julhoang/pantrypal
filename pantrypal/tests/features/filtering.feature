Feature: Searching items in the DataTable

  Scenario: Search items by name
    Given I am on the pantry page
    When I enter "apple" in the search bar
    Then I should see only items with "name" "apple" in the DataTable

  Scenario: Search items by type
    Given I am on the pantry page
    When I enter "fruit" in the search bar
    Then I should see only items with "type" "fruit" in the DataTable
