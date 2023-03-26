Feature: Sample Feature

  Scenario: Visit Google.com
    Given I am on the Google home page
    When I search for "Next.js"
    Then I should see "Next.js" in the search results
