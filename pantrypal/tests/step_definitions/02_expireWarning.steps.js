const { Given, When, Then } = require("cucumber");
const { Builder, By } = require("selenium-webdriver");
const { expect } = require("expect");

let { setDefaultTimeout } = require("cucumber");
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
  const item = await driver.findElement(By.id("expired-" + itemName));

  let nameFound = false;
  if (item == nameValue) {
    nameFound = true;
  }

  expect(nameFound).toBe(true);

  await driver.quit();
});
