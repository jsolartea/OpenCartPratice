import{test, expect} from "@playwright/test"
import {registerPage} from '../tests/Pages/registerPage'




test ('Register', async({page}) => {
const register = new registerPage(page);
await register.goToRegister();
});

test ('Full fill Register field', async({page}, testInfo) => {
const register = new registerPage(page);
await register.fillField();
await testInfo.attach('login',{
      body: await page.screenshot(), 
      contentType:'jhonny.png'})
});