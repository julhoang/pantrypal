const { Given, When, Then, AfterAll } = require("cucumber");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { expect } = require("expect");

var { setDefaultTimeout } = require("cucumber");
setDefaultTimeout(100 * 1000);

let driver;

Given("I am on the pantry page and the {string} is not in the DataTable", async function (string) {
  // Navigate to the home page
  driver = await new Builder().forBrowser("safari").build();
  await driver.get("http://localhost:3001/pantry");
});

When("I enter the item detials and click on the {string} button", async function (buttonName) {
  // Click on the specified button
  const nameInput = await driver.findElement(By.id(nameField));
    const typeInput = await driver.findElement(By.id(typeField));

    await nameInput.clear();
    await typeInput.clear();

    await nameInput.sendKeys("chicken2");
    // await typeInput.sendKeys("meat");


  const button = await driver.findElement(By.className("create"));
  await button.click();
});

Then("I should see a new record being created in the table", async function() {
  // Wait for the table to be updated with the new record
  await driver.wait(until.elementLocated(By.css("#pantryTable tbody tr")), 5000);

  // Verify that the new record has been added to the table
  const tableRows = await driver.findElements(By.css("#pantryTable tbody tr"));
  let itemFound = false;
  for (const row of tableRows) {
    const columns = await row.findElements(By.tagName("td"));
    if (columns[0].getText() === "chicken2") {
      itemFound = true;
      break;
    }
  }
  if (!itemFound) {
    throw new Error("New item not found in the table");
  }

  // Close the browser window
  await driver.quit();
});





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
