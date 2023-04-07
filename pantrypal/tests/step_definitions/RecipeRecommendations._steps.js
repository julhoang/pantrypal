const { Given, When, Then } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("expect");

let driver;

Given("the user's query returned a list of recipes", async function(){
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://localhost:3000/RecipeRecommendations");
    const findRecipeButton = await driver.findElement(By.id("findRecipeButton"));
    findRecipeButton.click();
});

When("the user clicks on a recipe card", async function(){
    await driver.wait(until.elementLocated(By.id("moreInfoButton-0")), 50000);
    const recipe = await driver.findElement(By.id("moreInfoButton-0"));
    recipe.click();
});

Then("the recipe's details are displayed", async function(){
    await driver.wait(until.elementLocated(By.id("recipeSourceButton-0")), 50000);
    const recipeIngredients = await driver.findElement(By.id("recipeSourceButton-0"));
    
    let ingredientsText = await recipeIngredients.getText();
    let textMatch = false;

    if(ingredientsText === "Recipe Source/ Instructions"){
        textMatch = true;
    }

    expect(textMatch).toBe(true);
    await driver.quit();
});