const { Given, When, Then } = require("cucumber");
const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("expect");

let driver;

const chrome = require("selenium-webdriver/chrome");
const options = new chrome.Options();
options.addArguments("--headless");

let { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(500 * 1000);

Given("the user's query returned a list of recipes", async function () {
  driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
  //Selecting an item to query
  await driver.get("http://localhost:3000/recipes");
  await driver.wait(until.elementLocated(By.xpath("//*[text()='cucumber']"), 50000));
  const button = driver.findElement(By.xpath("//*[text()='cucumber']"));

  // scroll to view
  await driver.executeScript("arguments[0].scrollIntoView(true);", button);

  button.click();

  const findRecipeButton = await driver.findElement(By.id("findRecipeButton"));
  findRecipeButton.click();
});

When("the user clicks on a recipe card", async function () {
  await driver.wait(until.elementLocated(By.id("moreInfoButton-0")), 50000);
  const recipe = await driver.findElement(By.id("moreInfoButton-0"));
  recipe.click();
});

Then("the recipe's details are displayed", async function () {
  const modal = await driver.wait(until.elementLocated(By.id("chakra-modal-recipeModal")), 50000);
  const recipeIngredients = await driver.wait(
    until.elementLocated(By.className("recipeSourceButton")),
    5000
  );

  expect(recipeIngredients).not.toBeNull();
  await driver.quit();
});
