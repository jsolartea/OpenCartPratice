import{Page, expect, test, Locator} from "@playwright/test";
import{URLS} from "../Data/constantes"
import { link } from "fs";
import { Url } from "url";
import {faker} from "@faker-js/faker"
import { on } from "events";




export class interceptorPage{
page! :Page;
principal! : Locator;
myAccount!: Locator;
register! : Locator;
urlRegister!: Url;
firstName ! : Locator;
lastName! : Locator;
telephone! : Locator;
email! : Locator;
password! : Locator;
passwordConfirm! : Locator;
radio!: Locator;
buttonContinue!: Locator;
ckeckBox! : Locator;


constructor (page:Page){
this.page=page;
this.principal = this.page.getByRole('link', {name: "Your Store"})
this.myAccount = this.page.locator("//li[@class='dropdown']//a[contains(., 'My Account')]") //('//*[@class=\'dropdown\']')
this.register= this.page.getByRole('link', {name: "Register"})
//this.urlRegister =  //this.page.getByRole('heading', {name: "Account"})
this.firstName = this.page.locator ("//*[@id=\'input-firstname\']") //("input[id='input-firstname]")
this.lastName = this.page.locator("//*[@id=\'input-lastname\']") //("input[id='input-lastname]")
this.telephone = this.page.locator("//*[@id=\'input-telephone\']")//("input[id='input-telephone]")
this.email = this.page.locator("//*[@id=\'input-email\']")// ('.id=input-email')
this.password = this.page.locator("//*[@id=\'input-password\']")//("input[id='input-password']")
this.passwordConfirm = this.page.locator("//*[@id=\'input-confirm\']")// ("input[id='input-confirm]")
this.radio = this.page.getByRole('radio', {name: "No"})
this.buttonContinue = this.page.getByRole('button', {name: "Continue"})
this.ckeckBox = this.page.locator("input[name='agree']")

}

async urlPage() {
    await this.page.goto(URLS.URLCART!);
}


async goToPrincipal(){
await this.urlPage()
await this.page.screenshot({path:'image/EventEmitter.jpg', fullPage: true})
await expect(this.principal).toBeVisible();

}
async goToRegister(){
/*await this.page.route("https://opencart.abstracta.us/image/cache/catalog/demo/banners/iPhone6-1140x380.jpg", (route)=> route.abort())
await this.page.route("https://opencart.abstracta.us/image/cache/catalog/demo/banners/MacBookAir-1140x380.jpg", (route)=> route.abort())
await this.page.route("https://opencart.abstracta.us/image/cache/catalog/demo/macbook_1-200x200.jpg", (route)=> route.abort())*/
await this.page.route("**/*.{png,jpg, jpeg}", (route)=> route.abort())
await this.goToPrincipal()
await this.myAccount.click()
await this.register.waitFor({ state: 'visible' });
await this.register.click()
await expect(this.page).toHaveURL('https://opencart.abstracta.us/index.php?route=account/register');
await this.page.waitForTimeout(6000)
}

async fillField(){
    
    await this.goToRegister();
    await this.firstName.fill('Luis');
    await this.lastName.fill('Paredes');
    const email1 = faker.internet.email({ firstName: 'Luis', lastName:'Paredes'});
    await this.email.fill(email1);
    await this.telephone.fill('123456789');
    await this.password.fill('12345678');
    await this.passwordConfirm.fill('12345678');
    await this.page.waitForTimeout(3000)
    await this.ckeckBox.click()
    await this.buttonContinue.click()
    await this.page.waitForTimeout(1000)

}
 
}