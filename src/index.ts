import App from './pages/app/app'
import './style.css'
import { isTheUserLoggedIn } from './pages/login/istheuserlogged'
import { setTokenStore } from './utils/settokenstore'

const app = new App()
app.run()
isTheUserLoggedIn()
setTokenStore()
