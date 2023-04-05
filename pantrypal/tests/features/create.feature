Feature: Adding item into the DataTable

  Scenario: Adding item into the DataTable with valid date
    Given I am on the pantry page
    When I click on the "Add Item" button
    Then I should see the "Add Item" page
    When I fill in the "Name" field with "Apple" and the "Date" field with "2015-01-01" and the "Type" field with "fruit"
    And I click on the "Add" button
    Then I should see the "Apple" in the "Name" column and the "2015-01-01" in the "Date" column and the "fruit" in the "Type" column

  Scenario: Adding item into the DataTable with existing item name
    Given I am on the pantry page
    When I click on the "Add Item" button
    Then I should see the "Add Item" page
    When I fill in the "Name" field with "Apple" and the "Date" field with "2015-01-01" and the "Type" field with "fruit"
    And I click on the "Add" button
    Then I should see the warning message "Item already exists"
