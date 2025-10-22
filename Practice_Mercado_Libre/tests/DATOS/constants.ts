import { configDotenv } from 'dotenv';
configDotenv
// Función que asegura que la variable existe
function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing required env var: ${key}`);
  }
  return value;
}

// Exportamos constantes seguras
 

export const URLS = {
    
    SAUCEDEMOURL: process.env.URL,
    URLCOSMOCODE: process.env.URLCOSMOCODE

}
export const CREDENTIALS = {
    USERLOCKED:process.env.USERLOCKED,
    USERACCESS:process.env.USERACCESS,
    USERPROBLEM: process.env.USERPROBLEM,
    PASSWORD:process.env.PASSWORD
}
