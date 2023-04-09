Feature: Deleting item from DataTable

  Scenario: Deleting item "Apple-test" from DataTable
    Given My DataTable contains "Apple-test"
    When I click "deletebtn" button from the row containing "Apple-test" in DataTable
    Then My DataTable does not contain "Apple-test"

  Scenario: Deleting item "Beef-test" from DataTable
    Given My DataTable contains "Beef-test"
    When I click "deletebtn" button from the row containing "Beef-test" in DataTable
    Then My DataTable does not contain "Beef-test"
