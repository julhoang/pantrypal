Feature: Item selection for finding recipies

  Scenario: look at available ingredients from the database
    Given "Banana" is in the database
    When I am on the recipe recomendation page
    Then I should see "Banana" on the page