Feature: Adding item into the DataTable

  Scenario: Adding item into the DataTable with new item name
    Given I am on the pantry page and the "Apple-test" is not in the DataTable
    When I click on the Add Item button with "Apple-test"
    Then I should see the "Apple-test" in the Name column

    Scenario: Adding item into the DataTable with new item name
    Given I am on the pantry page and the "Beef-test" is not in the DataTable
    When I click on the Add Item button with "Beef-test"
    Then I should see the "Beef-test" in the Name column
