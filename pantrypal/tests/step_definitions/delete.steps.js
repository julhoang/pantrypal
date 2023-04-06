const { Given, When, Then } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("expect");

var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(100 * 1000);

let driver;

Given("My DataTable contains {string}", async function (string) {
  // Navigate to the home page
  driver = await new Builder().forBrowser("chrome").build();
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

Then("My DataTable does not contain {string}", async function (nameValue) {
  // Locate the table rows and check that the specified values are displayed in the correct columns

  await driver.wait(until.elementLocated(By.css("tbody tr")), 50000);

  await new Promise((r) => setTimeout(r, 5000));
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
