const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("expect");

const chrome = require("selenium-webdriver/chrome");
const options = new chrome.Options();
options.addArguments("--headless");

let { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(100 * 1000);

let driver;

Given("I am on the pantry page and the {string} is not in the DataTable", async function (string) {
  // Navigate to the home page
  driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
  await driver.get("http://localhost:3000/pantry");
});

When("I click on the Add Item button with {string}", async function (buttonName) {
  // Click on the specified button
  const nameInput = await driver.findElement(By.className("itemname"));
  await nameInput.clear();
  await nameInput.sendKeys(buttonName);

  const button = await driver.findElement(By.className("create"));
  await button.click();
});

Then("I should see the {string} in the Name column", async function (buttonName) {
  // Locate the table rows and check that only rows with the specified property value are displayed
  await driver.wait(until.elementLocated(By.css("tbody tr")), 50000);
  const rows = await driver.findElements(By.css("tbody tr"));

  let nameFound = false;
  for (const row of rows) {
    const cells = await row.findElements(By.css("td"));
    const cellTexts = await Promise.all(cells.map((cell) => cell.getText()));
    if (cellTexts.some((text) => text.includes(buttonName))) {
      nameFound = true;
      break;
    }
  }
  expect(nameFound).toBe(true);
  await driver.quit();
});
