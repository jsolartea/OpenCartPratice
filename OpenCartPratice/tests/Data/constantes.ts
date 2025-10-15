import { configDotenv } from 'dotenv';
configDotenv 
/*import dotenv from 'dotenv';
dotenv.config();*/

// Función que asegura que la variable existe
function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing required env var: ${key}`);
  }
  return value;
}

// Exportamos constantes seguras


export const URLS: { URLCART: string }  = {//Si quieres evitar que URLCART sea opcional, puedes tiparlo así:

    URLCART: process.env.URLCART?? '' //Si quieres evitar que URLCART sea opcional, puedes tiparlo así
}/*
export const URLS= {//Si quieres evitar que URLCART sea opcional, puedes tiparlo así:

    URLCART: process.env.URLCART //Si quieres evitar que URLCART sea opcional, puedes tiparlo así
}*/
export const CREDENTIALS= {
  USERNAME: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD    
}