const { Given, When, Then } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("expect");

let { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(100 * 1000);

let driver;

Given("The user is looking at the table of items", async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/pantry");
});

When("{string} is expired", async function (itemName) {

});

Then("There is an indicator to show {string} is expired", async function (itemName) {

  const item = await driver.findElement(By.id("expired-"+itemName));
  //const row = await driver.wait(until.elementLocated(By.id(`row-${String(item_name)}`), 10000));

  let nameFound = false;
    if (item == nameValue) {
      nameFound = true;
    }

  expect(nameFound).toBe(true);

  await driver.close();
  await driver.quit();
  // close the browser
});
