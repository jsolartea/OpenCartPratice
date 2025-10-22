import {test} from'@playwright/test';
import {tableExaple} from'../tests/pageobjects/tableExaplePage'
import{URLS} from "../tests/DATOS/constants";


test ('ImprimirTabla1', async({page}) => {
const tableEjemplo = new tableExaple(page);
await tableEjemplo.LoginUrl();
await tableEjemplo.Row();
});

test ('Imprimir', async({page}) => {
const tableEjemplo = new tableExaple(page);
await tableEjemplo.LoginUrl();
await tableEjemplo.filtrarXLenguaje();
});

test ('Imprimir currency ', async({page}) => {
const tableEjemplo = new tableExaple(page);
await tableEjemplo.LoginUrl();
await tableEjemplo.filtrarXcurrency();
});

test ('Imprimir currency and lenguaje', async({page}) => {
const tableEjemplo = new tableExaple(page);
await tableEjemplo.LoginUrl();
await tableEjemplo.filtrarXcurrencyLenguaje();
});
test ('Cantidad de paises con monda Euro', async({page}) => {
const tableEjemplo = new tableExaple(page);
await tableEjemplo.LoginUrl();
await tableEjemplo.countCurrency();
});