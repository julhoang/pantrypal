Feature: Deleting item from DataTable

  Scenario: Deleting item "apple_test" from DataTable
    Given My DataTable contains "apple_test"
    When I click "Delete" button from the row containing "apple_test" in DataTable
    Then My DataTable does not contain "apple_test"

  Scenario: Deleting item "beef_test" from DataTable
    Given My DataTable contains "beef_test"
    When I click "Delete" button from the row containing "beef_test" in DataTable
    Then My DataTable does not contain "beef_test"
