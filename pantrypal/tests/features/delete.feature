Feature: Deleting item from DataTable

  Scenario: Deleting item from DataTable
    Given My DataTable contains "apple_test"
    When I click "Delete" button from the row containing "apple_test" in DataTable
    Then My DataTable does not contain "apple_test"
