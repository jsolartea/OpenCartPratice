import { test, expect } from '@playwright/test';

test('Shared 1', async ({ page }) => {
await page.goto ('https://www.mercadolibre.com.ve')
await page.locator (" input[id='cb1-edit']").fill('Iphone 15')
await page.keyboard.press('Enter')
//await expect(page).toHaveURL('https://listado.mercadolibre.com.ve/iphone-15')
await expect(page.locator('//ol[contains (@class, \'ui-search-layout\')]')).toBeVisible
await page.waitForTimeout(2000)
//await page.pause()

const titles = await page.locator('//ol[contains (@class, \'ui-search-layout\')]//li//h3').allInnerTexts()
console.log('The total number of result is:', titles.length)

for(let title of titles){
  console.log('The titles is:', title)
  /* await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/); */

}
});


test('Shared 2', async ({ page }) => {
  await page.goto ('https://www.mercadolibre.com.ve')
  //await page.getByRole('link', {name:'Mis compras', exact: true}).click() //Usar exact para el enlace exacto:
  //await page.locator('a[data-link-id="purchases"]').click() //otra forma de buscar y presionar el boton mis compras /Seleccionar por atributo único:
  await page.pause()



/*imprime los enlaces:
  const links = await page.getByRole('link', { name: 'Mis compras' }).all();
for (const link of links) {
  console.log(await link.evaluate(el => el.outerHTML));
}*/
});
test('Shared 3', async ({ page }) => {
  await page.goto ('https://www.mercadolibre.com.ve')
  //await page.getByRole('link', {name:'Ingresa'}).click
  await page.locator('a[data-link-id="login"]').click()//otra forma de buscar y presionar el boton Ingresar /Seleccionar por atributo único:
  
});