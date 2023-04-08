Feature: Item selection for finding recipies

  Scenario: look at available ingredients from the database
    Given "Bannana" is in the database
    When I am on the recipe recomendation page
    Then I should see "Bannana" on the page