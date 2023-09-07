import App from './pages/app/app'
import './style.css'
import { isTheUserLoggedIn } from './pages/login/istheuserlogged'

const app = new App()
app.run()
isTheUserLoggedIn()
