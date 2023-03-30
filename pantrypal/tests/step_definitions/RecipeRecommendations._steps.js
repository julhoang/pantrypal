const { Given, When, Then } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("expect");

let driver;

Given("Given the user's query returned a list of recipes", function(){
    const query = queryString(['chicken'],[],[]);
    const result = getRecipe(query);
    expect(result.count).toBe(!0);
})
When("When the user clicks on a {recipe} card", async function(recipe){
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/RecipeDisplay");
    const recipe = await driver.findElement(By.id("recipe-1"));
    recipe.click();
});

Then("Then the recipe's {details} are displayed", async function(details){
    const recipeInstructions = await driver.findElement(By.xpath("//*[text()='Instructions']"));
    expect(recipeInstructions).toBe(!null);
});