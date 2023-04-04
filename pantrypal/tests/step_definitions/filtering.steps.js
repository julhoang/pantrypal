const { Given, When, Then } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("expect");

var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(100 * 1000);

let driver;

Given("I am on the pantry page", async function () {
  // Navigate to the home page
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/pantry");
});

When("I enter {string} in the search bar", async function (searchTerm) {
  // Locate the search bar element and enter the search term
  const searchInput = await driver.findElement(By.id("searchBar"));
  await searchInput.sendKeys(searchTerm);
});

Then(
  "I should see only items with {string} {string} in the DataTable",
  async function (property, value) {
    // Locate the table rows and check that only rows with the specified property value are displayed
    await driver.wait(until.elementLocated(By.css("tbody tr")), 50000);
    const rows = await driver.findElements(By.css("tbody tr"));

    for (const row of rows) {
      const cells = await row.findElements(By.css("td"));
      const cellTexts = await Promise.all(cells.map((cell) => cell.getText()));
      if (cellTexts.some((text) => text.includes(value))) {
        continue;
      } else {
        throw new Error(
          `Expected to see items with the ${property} ${value} but found row with texts: ${cellTexts}`
        );
      }
    }

    await driver.quit();
  }
);
