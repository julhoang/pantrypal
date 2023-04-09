const { Given, When, Then } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("expect");

let { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(100 * 1000);

const chrome = require("selenium-webdriver/chrome");
const options = new chrome.Options();
options.addArguments("--headless");

let driver;

Given("My DataTable contains {string}", async function (string) {
  // Navigate to the home page
  driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
  await driver.get("http://localhost:3000/pantry");
});

When(
  "I click {string} button from the row containing {string} in DataTable",
  async function (buttonName, item_name) {
    // find the table
    await driver.wait(until.elementLocated(By.css("tbody tr")), 50000);

    // find the row containing the item_name
    const row = await driver.wait(until.elementLocated(By.id(`row-${String(item_name)}`), 10000));

    // find the delete button in the found row by id deletebtn-<item_name>
    const deleteButton = await row.findElement(By.className(`deletebtn`));
    await driver.executeScript("arguments[0].scrollIntoView()", deleteButton);

    await deleteButton.click();
  }
);

Then("My DataTable does not contain {string}", async function (nameValue) {
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
