import test from "@playwright/test"


test('Test webtable', async ({ page }) => {

    await page.goto('https://cosmocode.io/automation-practice-webtable/');

    const tableContainer = await page.locator('#countries');

    const rows = await tableContainer.locator('tr').all();

    /*  for (let row of rows) {
          //console.log(await row.innerText())
  
      }*/
    /*
        for (let index = 1; index <= rows.length; index++) {
            const contryName = await rows.at(index)?.locator('td').nth(1).innerText();
            const countryCapital = await rows.at(index)?.locator('td').nth(2).innerText();
            const contryCurrency = await rows.at(index)?.locator('td').nth(3).innerText();
            console.log("Country: " + contryName + ", Capital: " + countryCapital + ", Currency " + contryCurrency)
    
        }
    */

    const countries: Country[] = [];
    for (let row of rows) {
        let country: Country = {
            name: await row.locator('td').nth(1).innerText(),
            capital: await row.locator('td').nth(2).innerText(),
            currency: await row.locator('td').nth(3).innerText(),
            primaryLanguage: await row.locator('td').nth(4).innerText(),
        }

        countries.push(country);
    }

    for(let country of countries){
        console.log(country)
    }

       const countryWherePeopleSpeakPortuguese = countries.filter(country => country.primaryLanguage=='Portuguese')
       console.log('country Where People Speak Portuguese',countryWherePeopleSpeakPortuguese)

});

interface Country {
    name: string;
    capital: string;
    currency: string;
    primaryLanguage: string;
}