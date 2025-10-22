import { Locator, Page } from "@playwright/test";
import {URLS} from'../DATOS/constants'

export class tableExaple{
 page!: Page;
 table!: any;
 rows: any;

constructor (page:Page){
    this.page = page;

    
    
    }
async LoginUrl() {
        await this.page.goto('https://cosmocode.io/automation-practice-webtable/'); // Navega a la URL definida en constantes
    }

 async Row (){
const table= this.page.locator("xpath=//*[@id= 'countries']")
    const rows = table.locator("xpath=.//tr").all()
    const countries: Country[] =[];

    for(let row of await rows){
        let country: Country={
            name: await row?.locator("xpath=.//td[2]").innerText(),
            capital: await row.locator("xpath=.//td[3]").innerText(),
            currency: await row.locator("xpath=.//td[4]").innerText(),
            primaryLenguaje: await row.locator("xpath=.//td[5]").innerText(),
        }
        countries.push(country)
  //  console.log(country)
    }
       return countries;
 }

async filtrarXLenguaje(){
const countries = await this.Row()
   /*  for(let imprimirTabla of countries){

        console.log(imprimirTabla)
    }*/

 const countrywherePopleSpeakPortuguese = countries.filter(
    country => country.primaryLenguaje === 'Portuguese');

   console.log('country where Pople Speak Portuguese', countrywherePopleSpeakPortuguese)

}
  async filtrarXcurrency(){
const countries = await this.Row()
   /*  for(let imprimirTabla of countries){

        console.log(imprimirTabla)
    }*/

 const filtrarXcurrency = countries.filter(
    country => country.currency === 'Euro');

   console.log('country where currency is  Euro', filtrarXcurrency)

} 
   async filtrarXcurrencyLenguaje(){
const countries = await this.Row()
   /*  for(let imprimirTabla of countries){

        console.log(imprimirTabla)
    }*/

 const filtrarXcurrencyLenguaje = countries.filter( 
    country => country.currency === 'Euro' &&  
    country.primaryLenguaje === 'Portuguese' );

   console.log('country where currency is  Euro and leguaje is Portuguese', filtrarXcurrencyLenguaje)

} 
 async countCurrency(){
const countries = await this.Row()
   /*  for(let imprimirTabla of countries){

        console.log(imprimirTabla)
    }*/

 const filtrarXcurrency = countries.filter(
    country => country.currency === 'Euro').length;

   console.log('country where currency is  Euro', filtrarXcurrency)

} 



}
interface Country{
    name?: string;
    capital:string;
    currency: string;
    primaryLenguaje: string

}