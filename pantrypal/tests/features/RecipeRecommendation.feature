Feature: Recipe Recommendation    
    Scenario: User selects a recipe from all of the returned recipes
        Given the user's query returned a list of recipes
        When the user clicks on a recipe card
        Then the recipe's details are displayed
        