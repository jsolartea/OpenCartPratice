import{expect,Page, Locator} from"@playwright/test"
import{URLS, CREDENTIALS} from"../Data/constantes";
import dotenv from 'dotenv';
dotenv.config();

export class loginPage{

    page:Page;
    myAccount: Locator;
    eMailAddress: Locator;
    password: Locator;
    login: Locator;
    btnLogin: Locator;
    constructor (page:Page){
        this.page=page;
    this.myAccount = this.page.locator("//li[@class='dropdown']//a[contains(., 'My Account')]")  // this.myAccount = this.page.locator('a[href="/login"]'); //this.page.getByText('My Account') //this.myAccount = this.page.locator ("//ul[@class=\'dropdown-menu dropdown-menu-right\']")//("//li[@class='dropdown']//a[contains(., 'Login')]") //('//*[@class=\'dropdown\']')
    this.login= this.page.getByRole('link', {name: "Login"})
    this.eMailAddress = this.page.locator("input[id='input-email']");
    this.password = this.page.locator("input[id='input-password']");
    this.btnLogin = this.page.locator("input[type='submit']");
    }
async submitFormLogin(){
await this.myAccount.click();
await this.login.waitFor({ state: 'visible' });
await this.login.click();
console.log('Username:', CREDENTIALS.USERNAME);
console.log('password:', CREDENTIALS.PASSWORD);
await this.eMailAddress.fill(`${CREDENTIALS.USERNAME}`);//('jhonny.solarte@gmail.com')//
await this.password.fill(`${CREDENTIALS.PASSWORD}`)//('Test123.')//
await this.btnLogin.click();
//await this.page.screenshot({path:'images/login_dashboard.png', fullPage:true}) // toma foto dependiendo donde esta ubicado la linea de codigo
await expect(this.page).toHaveURL('https://opencart.abstracta.us/index.php?route=account/account')


}


















}