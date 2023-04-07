Feature: Sample Feature

  Scenario: look at available ingredients
    Given "Bannana" is in the database
    When I am on the recipe recomendation page
    Then I should see "Bannana" on the page
