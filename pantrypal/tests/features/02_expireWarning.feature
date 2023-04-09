Feature: Warning about expired items

    Scenario: An item is expired
        Given: The user is looking at the table of items
        When: "berry" is expired
        Then: There is an indicator to show "berry" is expired
