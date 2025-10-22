import { test, expect } from "@playwright/test"; 
import { loginPage } from '../tests/pageobjects/LoginPage'; 
import { ProductPage } from '../tests/pageobjects/ProductPage'; 
import { cartPage} from './pageobjects/CartPage'; 
import { CheckInformation} from './pageobjects/CheckInformation'; 
import {CompleteCheckout } from './pageobjects/CompleteCheckout'; 
import{CheckoutPage} from "./pageobjects/CheckoutPage"

test('LLenado de información', async ({ page }) => {
    // 🔹 Instanciamos las clases de Page Objects
    const MiprimerLogin = new loginPage(page);
    const MyProduct = new ProductPage(page);
    const Mycart = new cartPage(page);
    const checkInform = new CheckInformation(page);
   const complete = new CompleteCheckout(page);
    const checkout = new CheckoutPage(page);
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

    await MyProduct.showConsole();
    await page.waitForTimeout(1000); 
    // Espera para asegurar que el carrito se actualice

      await Mycart.cartVerifying(expectedName, expectedDescription, expectedPrice);
    
    await checkInform.fillField()
    await expect(page).toHaveURL(/checkout-step-two/);
    //await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    console.log('✔ Checkout completado exitosamente');
     await  complete.completeCheckout(expectedName, expectedDescription, expectedPrice)
    
    //await  checkout.checkoutComplete(expectedName, expectedDescription, expectedPrice)

});