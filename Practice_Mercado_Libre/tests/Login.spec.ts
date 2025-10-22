import { test } from '@playwright/test';                    // Importamos el método test de Playwright para crear los casos de prueba
import { loginPage } from './pageobjects/LoginPage';        // Importamos el Page Object de LoginPage para manejar la página de login
import { CREDENTIALS } from '../tests/DATOS/constants';     // Importamos las credenciales desde el archivo de constantes

// 🔹 Caso de prueba 1: Login exitoso
test('Login SauceDemo', async({ page }) => {
  const MiprimerLogin = new loginPage(page);              // Instanciamos el Page Object con la página de Playwright

  await MiprimerLogin.LoginUrl();                         // Navega a la URL de SauceDemo
  await MiprimerLogin.LoginSauceDemon();                  // Rellena usuario y contraseña válidos y hace click en login
  await page.waitForTimeout(1000);                        // Espera 1 segundo para asegurar que la página cargue completamente
});

// 🔹 Caso de prueba 2: Login fallido (usuario bloqueado)
test('Login fail', async({ page }, testInfo) => {
  const MiprimerLogin = new loginPage(page);              // Instanciamos el Page Object
  await MiprimerLogin.LoginUrl();                         // Navega a la página de login
  await MiprimerLogin.UseLockedSauceDemo(                // Intenta hacer login con un usuario bloqueado
    CREDENTIALS.USERLOCKED!, 
    CREDENTIALS.PASSWORD!
  );                                                      // Se espera que se muestre mensaje de error

  await page.waitForTimeout(1000);                        // Espera para que se visualice el mensaje de error
});

// 🔹 Caso de prueba 3: Login con usuario problemático
test('Login User Problem', async({ page }) => {
  const MiprimerLogin = new loginPage(page);              // Instanciamos el Page Object
  await MiprimerLogin.LoginUrl();                         // Navega a la página de login
  await MiprimerLogin.UseProblemSauceDemon();            // Intenta hacer login con un usuario que genera un problema (bug o comportamiento específico)
  await page.waitForTimeout(1000);                        // Espera para asegurar que la acción se ejecute
});