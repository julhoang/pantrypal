import { queryString } from "../pages/api/getRecipe";
import { expect, test } from "@jest/globals";

test("No query items", async () => {
    const res = queryString([], [], []);
    expect(res).toEqual("https://api.edamam.com/api/recipes/v2?type=any&app_id=8abfce08&app_key=c06091d57ff7df242e3138a49727e0c4&random=true&");
});

test("One query item", async () => {
    const res = queryString(['apple'], [], []);
    expect(res).toEqual("https://api.edamam.com/api/recipes/v2?type=any&app_id=8abfce08&app_key=c06091d57ff7df242e3138a49727e0c4&random=true&q=apple");
});

test("One health parameter", async () => {
    const res = queryString([], ['DASH'], []);
    expect(res).toEqual("https://api.edamam.com/api/recipes/v2?type=any&app_id=8abfce08&app_key=c06091d57ff7df242e3138a49727e0c4&random=true&health=DASH");
});

test("One mealType parameter", async () => {
    const res = queryString([], [], ['Lunch']);
    expect(res).toEqual("https://api.edamam.com/api/recipes/v2?type=any&app_id=8abfce08&app_key=c06091d57ff7df242e3138a49727e0c4&random=true&mealType=Lunch");
});

test("One of each parameter", async () => {
    const res = queryString(['banana'], ['vegan'], ['Snack']);
    expect(res).toEqual("https://api.edamam.com/api/recipes/v2?type=any&app_id=8abfce08&app_key=c06091d57ff7df242e3138a49727e0c4&random=true&q=banana&health=vegan&mealType=Snack");
});

