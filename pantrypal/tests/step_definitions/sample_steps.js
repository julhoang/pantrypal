const { Given, When, Then } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("expect");

let { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(100 * 1000);

let driver;

Given("I am on the Google home page", async function () {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://www.google.com/");
});

When("I search for {string}", async function (searchTerm) {
  const searchBox = await driver.findElement(By.name("q"));
  await searchBox.sendKeys(searchTerm, Key.RETURN);
});

Then("I should see {string} in the search results", async function (expectedResult) {
  await driver.wait(until.elementLocated(By.css("div.g")), 50000);
  const results = await driver.findElements(By.css("div.g"));
  const titles = await Promise.all(
    results.map(async (result) => await result.findElement(By.css("h3")).getText())
  );
  expect(titles.some((title) => title.includes(expectedResult))).toBe(true);
  await driver.quit();
});

