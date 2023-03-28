Feature: Select Ingredients
    Scenario: User wants to find a recipe, but there is nothing in the database
        Given user is on the recipe recommendation page and item selection area displays 0 items
        When the user hits the "Find Recipe" button
        Then the recipe recommendation page returns random recipes
    

Feature: Display recipes
    Scenario: User selects a recipe from all of the returned recipes
        Given the user's query returned a list of recipes
        When the user clicks on a recipe card
        Then the recipe's details are displayed