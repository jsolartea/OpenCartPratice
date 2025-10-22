import { Page, Locator, expect } from '@playwright/test';
// Importamos Page para manipular la página, Locator para localizar elementos y expect para validaciones

export class cartPage {
    page: Page; // Instancia de la página actual
   // private actualName!: Locator; // Locator para el nombre del producto en el carrito
   // private actualDescription!: Locator; // Locator para la descripción del producto
   // private actualPrice!: Locator; // Locator para el precio del producto

    constructor(page: Page) {
        this.page = page; // Inicializamos la página pasada al constructor
        // Nota: aquí no inicializamos los locators privados, ya que los obtenemos directamente en el método cartVerifying
    }

    /**
     * Verifica que los valores del producto en el carrito coincidan con los esperados
     * @param expectedName Nombre esperado del producto
     * @param expectedDescription Descripción esperada del producto
     * @param expectedPrice Precio esperado del producto
     */
    async cartVerifying(expectedName: string, expectedDescription: string, expectedPrice: string) {
        // ✅ Extraemos el texto de cada locator directamente desde la página
        const actualName = await this.page.locator('.inventory_item_name').innerText(); 
        const actualDescription = await this.page.locator('.inventory_item_desc').innerText(); 
        const actualPrice = await this.page.locator('.inventory_item_price').innerText(); 

        /*
        // Código comentado que no se usa, originalmente inicializaba locators privados
        this.actualName = this.page.locator('.inventory_item_name');
        this.actualDescription = this.page.locator('.inventory_item_desc');
        this.actualPrice = this.page.locator('.inventory_item_price');
        await this.actualName.innerText();
        await this.actualDescription.innerText();
        await this.actualPrice.innerText();
        */

        // Mostramos los valores esperados en consola
        console.log('name', expectedName);
        console.log('desc', expectedDescription);
        console.log('price', expectedPrice);

        // Mostramos los valores actuales extraídos de la página
        console.log('name1', actualName);
        console.log('desc1', actualDescription);
        console.log('price1', actualPrice);

        // ✅ Validamos que los valores actuales coincidan con los esperados
        expect(actualName).toEqual(expectedName);
        expect(actualDescription).toEqual(expectedDescription);
        expect(actualPrice).toEqual(expectedPrice);

        // ✅ Localizamos el botón "Checkout" por su rol y nombre, luego hacemos click
        await this.page.getByRole("button", { name: "Checkout" }).click();

        // ✅ Validamos que la siguiente página se haya cargado correctamente mostrando el título
        await expect(this.page.locator(".title")).toBeVisible();
       // await this.page.pause();
        console.log('LO LOGRAMOS .9.9.9.9.9..............................9.9999999')
    }
}