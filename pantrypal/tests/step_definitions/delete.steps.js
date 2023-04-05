// Feature: Deleting item from DataTable

// Scenario: Deleting item from DataTable
//     Given My DataTable contains "apple"
//     When I click "Delete" button from the row containing "apple" in DataTable
//     Then My DataTable does not contain "apple"

// write selenium code here to test the feature
// Path: tests/step_definitions/delete.steps.js

// Compare this snippet from tests/step_definitions/filtering.steps.js:

const { Given, When, Then } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("expect");

var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(100 * 1000);

let driver;

Given("My DataTable contains {string}", async function (string) {
  // Navigate to the home page
  driver = await new Builder().forBrowser("safari").build();
  await driver.get("http://localhost:3000/pantry");
});

When(
  "I click {string} button from the row containing {string} in DataTable",
  async function (buttonName, item_name) {
    // find the row containing the specified value item_name
    const row = await driver.findElement(By.xpath(`//td[contains(text(), "${item_name}")]`));

    // Click on the specified button in the row
    const button = await row.findElement(By.xpath(`//button[contains(text(), "${buttonName}")]`));
    await button.click();
  }
);

Then("My DataTable does not contain {string}", async function (string) {
  // Locate the table rows and check that the specified values are displayed in the correct columns
  await driver.wait(until.elementLocated(By.css("tbody tr")), 50000);
  const rows = await driver.findElements(By.css("tbody tr"));

  let nameFound = false;
  for (const row of rows) {
    const cells = await row.findElements(By.css("td"));
    const nameCell = cells[0];
    const name = await nameCell.getText();

    if (name === nameValue) {
      nameFound = true;
      break;
    }
  }

  expect(nameFound).toBe(false);

  await driver.quit();
});
