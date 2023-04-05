Feature: Deleting item from DataTable

  Scenario: Deleting item from DataTable
    Given My DataTable contains "apple"
    When I click "Delete" button from the row containing "apple" in DataTable
    Then My DataTable does not contain "apple"
