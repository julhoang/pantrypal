const { Given, When, Then } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("expect");

var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(100 * 1000);

let driver;

Given("I am on the pantry page", async function () {
// Navigate to the pantry page
driver = await new Builder().forBrowser("chrome").build();
await driver.get("http://localhost:3000/pantry");
});

When("I click on the edit button for {string}", async function (itemName) {
// Locate the edit button for the specified item name and click on it
const editButton = await driver.findElement(By.id("editButton"));
await editButton.click();
});

When("I update the {string} with {string}", async function (property, value) {
// Locate the input field for the specified property and enter the updated value
const inputField = await driver.findElement(By.id("item"));
await inputField.clear();
await inputField.sendKeys(value);
});

When("I click on the save button", async function () {
// Locate the save button and click on it
const saveButton = await driver.findElement(By.id("saveButton"));
await saveButton.click();
});

Then("I should see the updated {string} for {string}", async function (property, itemName) {
// Locate the updated value for the specified property and check if it matches the expected value
await driver.wait(until.elementLocated(By.css("tbody tr")), 50000);
const rows = await driver.findElements(By.css("tbody tr"));

for (const row of rows) {
const cells = await row.findElements(By.css("td"));
const itemNameCell = await cells[0].getText();
if (itemNameCell === itemName) {
const propertyValue = await cells[1].getText();
expect(propertyValue).toEqual(value);
return;
}
}

throw new Error(`Could not find item with name: ${itemName}`);
});

After(async function () {
// Close the browser after the test
await driver.quit();
});