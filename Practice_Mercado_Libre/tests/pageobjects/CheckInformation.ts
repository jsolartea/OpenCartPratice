import { Page,test, Locator, expect } from "@playwright/test";

export class CheckInformation{

page!:Page 
firstName!:Locator;
lastName!: Locator;
postalCode!:Locator;

constructor (page:Page) {
this.page=page;
 this.firstName =  this.page.locator('//input[@id=\'first-name\' and @name=\'firstName\']');
 this.lastName =  this.page.locator('//input[@id=\'last-name\']');
 this.postalCode = this.page.locator('//input[@id=\'postal-code\']');


}

async fillField(){
/*const firstName = await this.page.locator('//input[@id=\'first-name\' and @name=\'firstName\']').fill('John');
const lastName = await this.page.locator('//input[@id=\'last-name\']').fill('Doe');
const postalCode = await this.page.locator('//input[@id=\'postal-code\']').fill('12345');*/
await this.firstName.fill('John');
await this.lastName.fill('Doe');
await this.postalCode.fill('12345');

 
console.log('Name' , await this.firstName.inputValue());
console.log('Last', await this.lastName.inputValue());
console.log('Code', await this.postalCode.inputValue());

await this.page.locator("input[id='continue']").click()
expect(this.page.locator('.app_logo')).toBeVisible()

}


}