import { expect, Page } from "@playwright/test";
import { cartPage } from "./CartPage";

export class CheckoutPage{
page: Page;

 

constructor (page:Page){
this.page=page;
  
    

}

/**
     * Verifica que los valores del producto en el carrito coincidan con los esperados
     * @param expectedName Nombre esperado del producto
     * @param expectedDescription Descripción esperada del producto
     * @param expectedPrice Precio esperado del producto
     */

async checkoutComplete(expectedName: string, expectedDescription: string, expectedPrice: string){
   
    const bttfinish = this.page.getByRole('button', {name:'Finish'});
    const Message = this.page.getByRole('heading', {name:'THANK YOU FOR YOUR ORDER'});
    const newName = await this.page.locator('.inventory_item_name').innerText(); 
    const newDescription = await this.page.locator('.inventory_item_desc').innerText(); 
    const newPrice = await this.page.locator('.inventory_item_price').innerText(); 
    console.log('------------------------------------------------------------------------');
    console.log( 'Newname', newName);
    console.log( 'Newname', newDescription);
    console.log( 'Newname', newPrice);
    console.log( expectedName);
    console.log( expectedDescription);
    console.log( expectedPrice);
 
    // ✅ Compara que los valores del checkout sean iguales a los capturados en ProductPage
    expect(newName).toEqual(expectedName);
    expect(newDescription).toEqual(expectedDescription);
    expect(newPrice).toEqual(expectedPrice)

    await expect(bttfinish).toBeVisible();
    await bttfinish.click();
    await expect(Message).toBeVisible()

   
    }
}