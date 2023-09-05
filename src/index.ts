import App from './pages/app/app'
import './style.css'
import { isTheUserLoggedIn } from './pages/login/istheuserlogged'

const app = new App()
app.run()
isTheUserLoggedIn()
alert('Просим проверить работу в четверг, у нас ушел Тим Лид из команды на втором спринте и до сих пор никак не можем наверстать')
