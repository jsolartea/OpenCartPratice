import{test, expect} from "@playwright/test"
import {registerPage} from '../tests/Pages/registerPage'
import {loginPage} from '../tests/Pages/loginPage'
import {URLS, CREDENTIALS } from "./Data/constantes";


test ('logiApplication', async({page}, testoptions) => {
const register = new registerPage(page);
const login = new loginPage(page)
console.log('Valor actual de URLCART:', URLS.URLCART);
await register.urlPage();
//await page.screenshot({path:'Screenshots/login_dashboard.png'})
await login.submitFormLogin();
await testoptions.attach('login',{
      body: await page.screenshot(), 
      contentType:'jhonny.png'})

});

test ('logiApplication1', async({page}, testInfo) => {
const register = new registerPage(page);
const login = new loginPage(page)
console.log('Valor actual de URLCART:', URLS.URLCART);
await register.urlPage();
//await page.screenshot({path:'Screenshots/login_dashboard.png'})
await login.submitFormLogin();
await testInfo.attach('login', {
     // body: await page.screenshot(), 
      body: await page.screenshot({fullPage:true}),
      contentType:'image/jpg'})
});
