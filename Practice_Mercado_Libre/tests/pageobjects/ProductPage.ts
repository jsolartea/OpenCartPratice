import { expect, Page, Locator } from "@playwright/test"; 
// Importamos Page para manipular la página, Locator para localizar elementos y expect para validaciones

//import { Console } from "console"; 
// Importamos Console para poder hacer logs (opcional, se puede usar directamente console.log)

export class ProductPage {
  page: Page // Guardamos la instancia de la página
  private listItems!: Locator[]; // Array de locators de todos los productos en la página
  private randomItem!: Locator; // Locator de un producto aleatorio seleccionado
  private randomIndex!: number; // Índice aleatorio para seleccionar un producto
  private expectedDescription!: string; // Guardará la descripción del producto seleccionado
  private expectedName!: string; // Guardará el nombre del producto seleccionado
  private expectedPrice!: string; // Guardará el precio del producto seleccionado

  constructor(page: Page) {
    this.page = page // Inicializamos la página
  }

  // Método para seleccionar un producto aleatorio y extraer sus datos
  async arregloItems() {
    this.listItems = await this.page.locator(".inventory_item").all(); 
    // ✅ Obtenemos todos los elementos con clase 'inventory_item' y los guardamos en un array

    this.randomIndex = Math.floor(Math.random() * (await this.listItems.length)); 
    // ✅ Generamos un índice aleatorio entre 0 y la longitud del array

    this.randomItem = this.listItems[this.randomIndex]; 
    // ✅ Seleccionamos un producto aleatorio del array

    // ✅ Extraemos el texto de nombre, descripción y precio del producto seleccionado
    this.expectedName = await this.randomItem.locator('.inventory_item_name').textContent() || '';
    this.expectedDescription = await this.randomItem.locator('.inventory_item_desc').textContent() || '';
    this.expectedPrice = await this.randomItem.locator('.inventory_item_price').textContent() || '';
  }

  // Método para mostrar los valores extraídos en la consola
  async showConsole() {
    console.log(
      `Price: ${await this.expectedPrice} \n` + 
      `Name: ${await this.expectedName} \n` + 
      `Description: ${await this.expectedDescription}`
    );
    // ✅ Imprime los valores del producto seleccionado con saltos de línea
  }

  // Método para añadir el producto al carrito y verificar la página de carrito
  async verifiyingPage(): Promise<{ name: string; description: string; price: string }> {
    await this.randomItem.getByRole("button", { name: "Add to cart" }).click();   // ✅ Click en "Add to cart" dentro del producto aleatorio
    await this.page.locator(".shopping_cart_link").click(); // ✅ Click en el carrito para navegar a la página del carrito
    await expect(this.page.locator(".shopping_cart_link")).toBeVisible();   // ✅ Verifica que el carrito sea visible después de hacer click
    // ✅ Retornamos un objeto con los valores del producto para usarlos en tests posteriores
    return { name: this.expectedName, description: this.expectedDescription, price: this.expectedPrice };
  }
}