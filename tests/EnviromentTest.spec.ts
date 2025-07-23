import test from "@playwright/test"


test('Test enviroment',async({page})=>{

  await  page.goto(process.env.URL);
  await page.pause;
});