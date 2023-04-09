const { Given, When, Then, AfterAll } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("expect");

var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(100 * 1000);

let driver;

Given("I am on the pantry page and the {string} is not in the DataTable", async function (string) {
  // Navigate to the home page
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://localhost:3000/pantry");
});

When("I click on the Add Item button with {string}", async function (buttonName) {
  // Click on the specified button
  const nameInput = await driver.findElement(By.className("itemname"));
    //const typeInput = await driver.findElement(By.id(typeField));

    await nameInput.clear();
    //await typeInput.clear();

    await nameInput.sendKeys(buttonName);
    // await typeInput.sendKeys("meat");


  const button = await driver.findElement(By.className("create"));
  await button.click();
});

Then("I should see the {string} in the Name column", async function(buttonName) {
    // Locate the table rows and check that only rows with the specified property value are displayed
    await driver.wait(until.elementLocated(By.css("tbody tr")), 50000);
    const rows = await driver.findElements(By.css("tbody tr"));

    nameFound = false;
    for (const row of rows) {
      const cells = await row.findElements(By.css("td"));
      const cellTexts = await Promise.all(cells.map((cell) => cell.getText()));
      if (cellTexts.some((text) => text.includes(buttonName))) {
        nameFound = true;
      } 
    }
    expect(nameFound).toBe(true);
    await driver.quit();
  }
);





// Then(
//   "I should see the {string} in the {string} column and the {string} in the {string} column and the {string} in the {string} column",
//   async function (nameValue, nameColumn, dateValue, dateColumn, typeValue, typeColumn) {
//     // Locate the table rows and check that the specified values are displayed in the correct columns
//     await driver.wait(until.elementLocated(By.css("tbody tr")), 50000);
//     const rows = await driver.findElements(By.css("tbody tr"));

//     let nameFound = false;
//     let dateFound = false;
//     let typeFound = false;

//     for (const row of rows) {
//       const cells = await row.findElements(By.css("td"));
//       const cellTexts = await Promise.all(cells.map((cell) => cell.getText()));
//       if (cellTexts[0] === nameValue && cellTexts[1] === dateValue && cellTexts[2] === typeValue) {
//         nameFound = true;
//         dateFound = true;
//         typeFound = true;
//         break;
//       }
//     }

//     if (!nameFound) {
//       throw new Error(
//         `Expected to see ${nameValue} in the ${nameColumn} column but did not find it`
//       );
//     }

//     if (!dateFound) {
//       throw new Error(
//         `Expected to see ${dateValue} in the ${dateColumn} column but did not find it`
//       );
//     }

//     if (!typeFound) {
//       throw new Error(
//         `Expected to see ${typeValue} in the ${typeColumn} column but did not find it`
//       );
//     }

//     await driver.quit();
//   }
// );

// Then("I should see the warning message {string}", async function (warningMessage) {
//   // Check that a warning message is displayed with the expected message text
//   const warningElement = await driver.findElement(By.className("warning"));
//   const actualWarningMessage = await warningElement.getText();
//   expect(actualWarningMessage).toBe(warningMessage);

//   await driver.quit();
// });
