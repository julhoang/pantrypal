const { Given, When, Then } = require("cucumber");
const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("expect");

let { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(100 * 1000);

const chrome = require("selenium-webdriver/chrome");
const options = new chrome.Options();
options.addArguments("--headless");

let driver;

Given("{string} is in the database", async function (item) {});

When("I am on the recipe recomendation page", async function () {
  driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
  await driver.get("http://localhost:3000/recipes");
});

Then("I should see {string} on the page", async function (nameValue) {
  await driver.wait(until.elementLocated(By.xpath("//*[text()='Banana']"), 5000));

  const button = driver.findElement(By.id("Banana"));

  const name = await button.getText();

  let nameFound = false;
  if (name == nameValue) {
    nameFound = true;
  }

  expect(nameFound).toBe(true);

  await driver.quit();
});
