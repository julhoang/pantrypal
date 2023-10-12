const { Given, When, Then } = require("@cucumber/cucumber");
const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("expect");

let { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(100 * 1000);

const chrome = require("selenium-webdriver/chrome");
const options = new chrome.Options();
options.addArguments("--headless");

let driver;

Given("The user is looking at the table of items", async function () {
  driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
  await driver.get("http://localhost:3000/pantry");
});

When("{string} is expired", async function (itemName) {});

Then("There is an indicator to show {string} is expired", async function (itemName) {
  const warningZone = await driver.wait(until.elementLocated(By.id("warning-zone"), 50000));
  const item = await driver.findElement(By.id("expired-" + itemName));
  const itemText = await item.getText();
  expect(String(itemText).toLowerCase()).toEqual(String(itemName).toLowerCase());

  await driver.quit();
});
