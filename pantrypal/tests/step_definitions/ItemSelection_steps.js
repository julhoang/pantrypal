const { Given, When, Then } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("expect");

let { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(100 * 1000);

let driver;

Given("{string} is in the database", async function (item) {

});

When("I am on the recipe recomendation page", async function () {
  driver = await new Builder().forBrowser("chrome").build();
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

  await driver.close();
  await driver.quit();
  // close the browser
});
