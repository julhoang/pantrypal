Feature: Adding item into the DataTable

  Scenario: Adding item into the DataTable with new item name
    Given I am on the pantry page and the "Apple-test" is not in the DataTable
    When I click on the "Add Item" button
    And I should see the "Add Item" page
    And I fill in the "Name" field with "Apple-test" and the "Date" field with "2015-01-01" and the "Type" field with "fruit"
    And I click on the "Add" button
    Then I should see the "Apple-test" in the "Name" column and the "2015-01-01" in the "Date" column and the "fruit" in the "Type" column

  Scenario: Adding item into the DataTable with existing item name
    Given I am on the pantry page and the "Apple-test" is in the DataTable
    When I click on the "Add Item" button
    And I fill in the "Name" field with "Apple-test" and the "Date" field with "2015-01-01" and the "Type" field with "fruit"
    And I click on the "Add" button
    Then I should see the warning message "Item already exists"
