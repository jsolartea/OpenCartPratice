import{test, expect, Page} from "@playwright/test";

interface Country{
    name?: string;
    capital:string;
    currency: string;
    primaryLenguaje: string

}


test ('Probando como acceder a una tabla', async ({page}) => {
await page.goto('https://cosmocode.io/automation-practice-webtable/');

    const table= page.locator("xpath=//*[@id= 'countries']")
    const rows = await table.locator("xpath=.//tr").all()

    console.log(rows.length)
    /**
    for(let row of rows){

        console.log(await row.innerText())
    }
    const row1= rows.at(1)

    const countryName = await row1?.locator("xpath=.//td[2]").innerText()
    const countryCapital = await row1?.locator("xpath=.//td[3]").innerText()
    const countryCurrency = await row1?.locator("xpath=.//td[4]").innerText()

    console.log(countryName, countryCapital, countryCurrency);*/
   
    const countries: Country[] =[];
    

    for(let row of rows){
        let country: Country={
            name: await row?.locator("xpath=.//td[2]").innerText(),
            capital: await row.locator("xpath=.//td[3]").innerText(),
            currency: await row.locator("xpath=.//td[4]").innerText(),
            primaryLenguaje: await row.locator("xpath=.//td[5]").innerText(),
        }
        countries.push(country)

    }
    for(let imprimirTabla of countries){

        console.log(imprimirTabla)
    }

    const countrywherePopleSpeakPortuguese = countries.filter(country => country.primaryLenguaje === 'Portuguese')

    console.log('country where Pople Speak Portuguese', countrywherePopleSpeakPortuguese)

})


//tr es las filas
// td[3] da la poscion en esa fila es decir la tercera columna

//table [@id='countries']//tr[2]//td[1] - > Check
//table [@id='countries']//tr[2]//td[2] - > Country
//table [@id='countries']//tr[2]//td[3] - > Capital
//table [@id='countries']//tr[2]//td[4] - > Currency
//table [@id='countries']//tr[2]//td[5] - > Modeda


