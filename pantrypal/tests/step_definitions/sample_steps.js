const { Given, When, Then } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("expect");
//var createItem = require("../../pages/api/createItem.ts").createItem;


let driver;

// Given("I am on the Google home page", async function () {
//   driver = await new Builder().forBrowser("chrome").build();
//   await driver.get("https://www.google.com/");
// });

// When("I search for {string}", async function (searchTerm) {
//   const searchBox = await driver.findElement(By.name("q"));
//   await searchBox.sendKeys(searchTerm, Key.RETURN);
// });

// Then("I should see {string} in the search results", async function (expectedResult) {
//   await driver.wait(until.elementLocated(By.css("div.g")), 50000);
//   const results = await driver.findElements(By.css("div.g"));
//   const titles = await Promise.all(
//     results.map(async (result) => await result.findElement(By.css("h3")).getText())
//   );
//   expect(titles.some((title) => title.includes(expectedResult))).toBe(true);
//   await driver.quit();
// });

Given("{string} is in the database", async function (item) {
  // const newItem = {
  //   name: item,
  //   expiry: "Noon",
  //   notes: "this is a test",
  //   type: "fruit",
  // };
  // const res = await createItem(newItem);
});

When("I am on the recipe recomendation page", async function () {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/RecipeRecommendations");
});

Then("I should see {string} on the page", async function (expectedResult) {
   expect(await driver.findElement({name:'Bannana'}).toBe(True));
   await driver.quit();
});
