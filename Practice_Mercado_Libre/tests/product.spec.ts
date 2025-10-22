import { test } from '@playwright/test'; // Importa la función test de Playwright
import { loginPage } from './pageobjects/LoginPage'; // Importa el Page Object de login
import { ProductPage } from './pageobjects/ProductPage'; // Importa el Page Object de productos

test('Mis Productos', async({ page }) => { 
  const MiprimerLogin = new loginPage(page); // Instancia de LoginPage con la página actual
  const MyProduct = new ProductPage(page); // Instancia de ProductPage con la página actual

  await MiprimerLogin.LoginUrl(); // Navega a la URL de SauceDemo
  await MiprimerLogin.LoginSauceDemon(); // Hace login con usuario válido
  await page.waitForTimeout(1000); // Espera 1 segundo para asegurar que la página cargue

  await MyProduct.arregloItems(); // Obtiene todos los productos y selecciona uno aleatorio
  await MyProduct.showConsole(); // Muestra en consola el nombre, descripción y precio del producto seleccionado
  await MyProduct.verifiyingPage(); // Agrega el producto al carrito y verifica que el carrito sea visible
});
