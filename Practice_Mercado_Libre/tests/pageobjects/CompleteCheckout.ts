
import { expect, Page } from "@playwright/test"; 

export class CompleteCheckout{
readonly page:Page;

constructor(page: Page) {
this.page=page;
 
}
/**
     * Verifica que los valores del producto en el carrito coincidan con los esperados
     * @param actualName Nombre esperado del producto
     * @param actualDescription Descripción esperada del producto
     * @param actualPrice Precio esperado del producto
     */

 async completeCheckout(actualName: string, actualDescription: string, actualPrice: string){
//const newName =  await this.page.locator('.inventory_item_name');// Crea una constante que guardaria el objeto encontrado el locator, en este caso guarda el texto que contiene ese locator por medio de innerText() 
//const newDescrition = await this.page.locator('.inventory_item_desc');// Crea una constante que guardaria el objeto encontrado el locator, en este caso guarda el texto que contiene ese locator por medio de innerText() 
//const newPrice = await this.page.locator('.inventory_item_price');//
const bttfinish = this.page.getByRole('button', {name:'Finish'});
const Message = this.page.getByRole('heading', {name:'THANK YOU FOR YOUR ORDER'});
    const nameLocator = this.page.locator('.inventory_item_name');
    const descLocator = this.page.locator('.inventory_item_desc');
    const priceLocator = this.page.locator('.inventory_item_price');     

    await expect(nameLocator).toBeVisible();
    await expect(descLocator).toBeVisible();
    await expect(priceLocator).toBeVisible();

    const newName = (await nameLocator.textContent())?.trim() || '';
    const newDescrition = (await descLocator.textContent())?.trim() || '';
    const newPrice = (await priceLocator.textContent())?.trim() || '';



        console.log('name1', actualName);
        console.log('desc1', actualDescription);
        console.log('price1', actualPrice);
        console.log(`-------------------------------------------`)
        console.log(`Product Name`,newName)
        console.log(`Product Description`, newDescrition)
        console.log(`Product Price`, newPrice)

        // ✅ Validamos que los valores actuales coincidan con los esperados
        expect(newName).toBe(actualName);
        expect(newDescrition).toBe(actualDescription);
        expect(newPrice).toEqual(actualPrice);
       
        await expect(bttfinish).toBeVisible();
        await bttfinish.click();
        await expect(Message).toBeVisible()
       // return{ name: this.newName, description: this.newDescrition, price: this.newPrice };

       console.log('LO LOGRAMOS 11111111..............................9.9999999')

 }
}


