import {test, expect} from '@playwright/test';


test('purchase and item', async({page}) =>{
/*
    await page.goto('https://www.saucedemo.com/')
    //await page.locator("input[id='user-name']").fill('standard_user')
    await page.locator ("//input[@name='user-name'and @id='user-name']").fill('standard_user')
    await page.locator('input[id="password"]').fill('secret_sauce')
    await page.locator('input[id="login-button"]').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
*/

  await page.goto('https://www.saucedemo.com/')
     await page.getByRole('textbox', {name:'Username'}).fill('standard_user')
     await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce')
     await page.getByRole('button', {name:'login'}).click()
     //await page.pause()
     

     //const listItems =  await page.locator('#inventory_container .inventory_item').all() //Buscando la clase .inventory_item con Locator
     const listItems =  await page.locator('//div [@class =\'inventory_item\']').all() 
     // Verifica que haya elementos para evitar errores
    if (listItems.length === 0) {
    throw new Error('No se encontraron productos en la página');
    } 
     const randomIndex = Math.floor(Math.random() * listItems.length) // Genera un índice aleatorio para seleccionar un elemento de la lista listItems
     const randomItem = listItems[randomIndex] //Aquí se selecciona un producto aleatorio de la lista de productos para realizar acciones posteriores (como obtener su descripción, nombre o precio).
     const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()//Busca un elemento con la clase CSS inventory_item_desc dentro del randomItem (el producto aleatorio) y extrae su texto. El texto se almacena en expectedDescription.
     const expectedName = await randomItem.locator('.inventory_item_name').innerText()//Busca un elemento con la clase CSS inventory_item_name dentro del randomItem (el producto aleatorio) y extrae su texto. El texto se almacena en expectedName.
     const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()//Busca un elemento con la clase CSS inventory_item_price dentro del randomItem (el producto aleatorio) y extrae su texto. El texto se almacena en expectedprice.

console.log(`Price:${expectedPrice} \nName: ${expectedName} \nDescription: ${expectedDescription}` )// Imprime los valores con saltos de línea
console.log('Total Items encontrados', listItems.length)   // Imprime el total de items encontrados
await randomItem.getByRole('button', {name:'Add to cart'}).click() //No se utiliza (Page) sino el el item ramdon ya que puede acceder a todas las propiedades

await page.locator('//a[@class=\'shopping_cart_link\']').click() // como locator |a[class='shopping_cart_link']| - Utilizando punto en lugar del nombre de la clase .shopping_cart_link

expect(page.locator('.shopping_cart_link')).toBeVisible()

const actualName = await page.locator('.inventory_item_name').innerText()
const actualDescrition = await page.locator('.inventory_item_desc').innerText()
const actualPrice = await page.locator('.inventory_item_price').innerText()

expect(actualName).toEqual(expectedName)
expect(actualDescrition).toEqual(expectedDescription)
expect(actualPrice).toEqual(expectedPrice)

await page.locator("button[id='checkout']").click()

//await page.locator("input[id='first-name']").fill('John') 
//await page.locator("input[id='last-name']").fill('Doe')
//await page.locator("input[id='postal-code']").fill('12345')

await page.locator('//input[@id=\'first-name\' and @name=\'firstName\']').fill('John') 
await page.locator('//input[@id=\'last-name\']').fill('Doe')
await page.locator('//input[@id=\'postal-code\']').fill('12345')

//await page.getByRole('textbox', {name:'First Name'}).fill('John') //await page.locator('//input[@id=\'first-name\']').fill('John') 
//await page.getByRole('textbox', {name:'Last Name'}).fill('Doe')//await page.locator('//input[@id=\'last-name\']').fill('Doe')
//await page.getByRole('textbox', {name:'Zip/Postal code'}).fill('12345')//await page.locator('//input[@id=\'postal-code\']').fill('12345')

await page.locator("input[id='continue']").click()

expect(page.locator('.app_logo')).toBeVisible()

const newName = await page.locator('.inventory_item_name').innerText()// Crea una constante que guardaria el objeto encontrado el locator, en este caso guarda el texto que contiene ese locator por medio de innerText() 
const newDescrition = await page.locator('.inventory_item_desc').innerText() // Crea una constante que guardaria el objeto encontrado el locator, en este caso guarda el texto que contiene ese locator por medio de innerText() 
const newPrice = await page.locator('.inventory_item_price').innerText()// Crea una constante que guardaria el objeto encontrado el locator, en este caso guarda el texto que contiene ese locator por medio de innerText() 


expect(actualName).toEqual(newName) // compara el nombre obtenido en otro paso del proceso con el nombre del paso actual
expect(actualDescrition).toEqual(newDescrition) // compara el Descrition obtenido en otro paso del proceso con el Descrition del paso actual
expect(actualPrice).toEqual(newPrice) // compara el Descrition obtenido en otro paso del proceso con el Price del paso actual

console.log(`-------------------------------------------`)
console.log(`Product Name`,newName)
console.log(`Product Description`, newDescrition)
console.log(`Product Price`, newPrice)

await page.getByRole('button', {name:'Finish'}).click()
await expect(page.getByRole('heading', {name:'THANK YOU FOR YOUR ORDER'})).toBeVisible()


  /*


   const listItems =  await page.locator('#inventory_container inventory_item').all()
     const ramdomIndex = Math.floor(Math.random() * listItems.length)
     const randomItem = listItems[ramdomIndex]
     const expectedDescription = await randomItem.locator('inventory_item_desc').innerText
     const expectedDeName = await randomItem.locator('inventory_item_name').innerText
     const expectedPrice = await randomItem.locator('inventory_item_price').innerText

     
     console.log('Contando los items', listItems.length)
     for (let listado of listItems){
        console.log('Lista', listItems)





     }*/

});