import { Page, expect, Locator } from '@playwright/test'; 
// Importamos las clases necesarias de Playwright: Page para manipular la página, Locator para localizar elementos y expect para hacer validaciones.

export class CartPage {
  page: Page; // Guardará la instancia de la página actual
  actualName: Locator; // Locator para el nombre del producto en el carrito
  actualDescription: Locator; // Locator para la descripción del producto en el carrito
  actualPrice: Locator; // Locator para el precio del producto en el carrito

  constructor(page: Page) {
    this.page = page; // Inicializamos la página pasada al constructor
    this.actualName = page.locator('.inventory_item_name'); // Inicializamos el locator del nombre del producto
    this.actualDescription = page.locator('.inventory_item_desc'); // Inicializamos el locator de la descripción
    this.actualPrice = page.locator('.inventory_item_price'); // Inicializamos el locator del precio
  }

  /**
   * Verifica que los valores del producto en el carrito coincidan con los esperados
   * @param expectedName string - nombre esperado del producto
   * @param expectedDescription string - descripción esperada
   * @param expectedPrice string - precio esperado
   */
  async cartVerifying(expectedName: string, expectedDescription: string, expectedPrice: string) {
    // ✅ Extraemos el texto de cada locator para poder compararlo con los valores esperados
    const nameText = await this.actualName.innerText(); 
    const descText = await this.actualDescription.innerText(); 
    const priceText = await this.actualPrice.innerText(); 

    // Mostramos en consola los valores extraídos del carrito
    console.log('Name en carrito:', nameText); 
    console.log('Description en carrito:', descText);
    console.log('Price en carrito:', priceText);

    // ✅ Validamos que los valores extraídos coincidan exactamente con los esperados
    expect(nameText).toEqual(expectedName); 
    expect(descText).toEqual(expectedDescription); 
    expect(priceText).toEqual(expectedPrice); 

    // ✅ Localizamos el botón "Checkout" usando getByRole y esperamos que sea visible antes de hacer click
    const checkoutButton = this.page.getByRole('button', { name: 'Checkout' }); 
    await expect(checkoutButton).toBeVisible(); // Validamos visibilidad
    await checkoutButton.click(); // Hacemos click en el botón

    // ✅ Validamos que la página siguiente (checkout info) se haya cargado correctamente
    await expect(this.page.locator('.title')).toBeVisible(); 
  }
}
