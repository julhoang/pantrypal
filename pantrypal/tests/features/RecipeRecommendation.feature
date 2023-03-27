Feature: Select Ingredients
    Scenario: User wants to find a recipe, but there is nothing in the database
        Given user is on the homepage and there are 0 items displayed
        When the user hits the "Find Recipe" button
        Then the recipe recommendation page returns random recipes
    
