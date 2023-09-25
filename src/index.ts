import App from './pages/app/app'
import './style.css'
import { isTheUserLoggedIn } from './pages/login/isTheUserLogged'
import { setTokenStore } from './utils/setTokenStore'

const app = new App()
app.run()
isTheUserLoggedIn()
setTokenStore()