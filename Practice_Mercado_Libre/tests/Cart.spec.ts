import { test, expect } from "@playwright/test"; 
// Importamos test y expect de Playwright para crear casos de prueba y validaciones

import { loginPage } from '../tests/pageobjects/LoginPage'; 
// Importamos el Page Object de LoginPage
import { ProductPage } from '../tests/pageobjects/ProductPage'; 
// Importamos el Page Object de ProductPage
import { cartPage } from './pageobjects/CartPage'; 
// Importamos el Page Object de CartPage

test('Listas en carrito', async ({ page }) => {
    // 🔹 Instanciamos las clases de Page Objects
    const MiprimerLogin = new loginPage(page);
    const MyProduct = new ProductPage(page);
    const Mycart = new cartPage(page);

    // 🔹 Paso 1: Login
    await MiprimerLogin.LoginUrl(); 
    // Navega a la URL de SauceDemo
    await MiprimerLogin.LoginSauceDemon(); 
    // Rellena usuario y contraseña y hace click en login
    await page.waitForTimeout(1000); 
    // Pequeña espera para asegurar que la página cargue

    // 🔹 Paso 2: Selección de producto aleatorio en ProductPage
    await MyProduct.arregloItems(); 
    // Obtiene todos los productos y selecciona uno aleatorio
    await page.waitForTimeout(1000); 
    // Espera para que los elementos estén visibles

    // 🔹 Paso 3: Validar flujo de checkout
    const { name: expectedName, description: expectedDescription, price: expectedPrice } = 
        await MyProduct.verifiyingPage(); 
    // Añade el producto al carrito y obtiene los valores esperados

    await page.waitForTimeout(1000); 
    // Espera para asegurar que el carrito se actualice

    await Mycart.cartVerifying(expectedName, expectedDescription, expectedPrice); 
    // Verifica que los valores en el carrito coincidan con los obtenidos en ProductPage

    console.log('EXITO TOTAL :) :) :) :)'); 
    // Mensaje en consola indicando que el flujo completo se ejecutó correctamente
});
