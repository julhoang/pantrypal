Feature: editing items in the DataTable

    Scenario: edit items by name
        Given I am on the pantry page
        When I edit the name of an item from "apple" to "dragonapple" in the by clicking on the edit button 
        Then I should see that item updated with the "name" "dragonapple" in the DataTable

    Scenario: Edit items by expiry date
        Given I am on the pantry page
        When I edit the expiry date of "apple" to "2023-05-01" by clicking on the edit button
        Then I should see that item updated with  "expiry date" "2023-05-01" in the DataTable

    Scenario: Edit items by notes
        Given I am on the pantry page
        When I edit the notes of "apple" to "Organic apple from local farm" by clicking on the edit button
        Then I should see that item updated with "notes" "Organic apple from local farm" in the DataTable

    Scenario: Edit items by multiple attributes
        Given I am on the pantry page
        When I edit the name of "apple" to "golden apple", the expiry date to "2023-04-15", and the notes to "Sweet and juicy" by clicking on the edit button
        Then I should see that item updated with  "name" "golden apple", "expiry date" "2023-04-15", and "notes" "Sweet and juicy" in the DataTable