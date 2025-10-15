import{test, expect} from "@playwright/test"
import {interceptorPage} from './Pages/interceptorPage'




test ('Interceptor', async({page}) => {
const register = new interceptorPage(page);
await register.goToRegister();
});

