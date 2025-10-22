import { expect, Locator, Page } from "@playwright/test"
// Importamos Page para manipular la página, Locator para localizar elementos y expect para validaciones

import { URLS, CREDENTIALS } from '../DATOS/constants'
// Importamos constantes de URL y credenciales definidas en un archivo separado

export class loginPage {

    private readonly username: Locator // Locator para el campo de usuario
    private readonly password: Locator // Locator para el campo de contraseña
    private readonly loginbutton: Locator // Locator para el botón de login
    private readonly titleProducts: Locator // Locator para el título de la página después del login
    private readonly errorUser: Locator // Locator para mensaje de usuario bloqueado
    private page: any; // Guardamos la instancia de la página

    constructor(page: Page){
        this.page = page // Inicializamos la página
        this.username = page.getByRole('textbox', { name: 'Username' }) // Buscamos el campo de usuario por rol
        this.password = page.getByRole('textbox', { name: 'Password' }) // Buscamos el campo de contraseña por rol
        this.loginbutton = page.getByRole('button', { name: 'login' }) // Buscamos el botón de login por rol
        this.titleProducts = page.locator(".title") // Locator para verificar título de página tras login
        this.errorUser = page.getByRole('heading', { name: 'Epic sadface: Sorry, this user has been locked out' })
        // Locator para validar error de usuario bloqueado
    }

    // Método para login exitoso con usuario normal
    async LoginSauceDemon(){
        await this.username.fill(CREDENTIALS.USERACCESS!); // Llenamos el campo username
        await this.password.fill(CREDENTIALS.PASSWORD!); // Llenamos el campo password
        await this.loginbutton.click() // Hacemos click en login
        await expect(this.titleProducts).toBeVisible() // Validamos que el login fue exitoso mostrando el título
    }

    // Método para solo verificar que el login fue exitoso
    async checkSuccessfulLogin(){
        await expect(this.titleProducts).toBeVisible() // Verifica que el título esté visible
    }

    // Método para navegar a la URL principal de SauceDemo
    async LoginUrl() {
        await this.page.goto(URLS.SAUCEDEMOURL); // Navega a la URL definida en constantes
    }

    // Método para login con usuario bloqueado
    async UseLockedSauceDemo(user: string, password: string){
        await this.username.fill(CREDENTIALS.USERLOCKED!); // Llenamos el campo con usuario bloqueado
        await this.password.fill(CREDENTIALS.PASSWORD!); // Llenamos el campo password
        await this.loginbutton.click(); // Click en login
        await expect(this.errorUser).toBeVisible(); // Validamos que se muestre mensaje de usuario bloqueado
    }

    // Método para login con usuario que genera problemas
    async UseProblemSauceDemon(){
        // Validamos que las credenciales estén definidas
        if (!CREDENTIALS.USERLOCKED || !CREDENTIALS.PASSWORD) {
            throw new Error("USERLOCKED or PASSWORD is undefined in CREDENTIALS"); // Error si no existen credenciales
        }
        await this.username.fill(CREDENTIALS.USERPROBLEM!); // Llenamos username problemático
        await this.password.fill(CREDENTIALS.PASSWORD!); // Llenamos password
        await this.loginbutton.click(); // Click en login
        await expect(this.titleProducts).toBeVisible() // Validamos login exitoso
    }
}