import App from './pages/app/app'
import './style.css'
import { isTheUserLoggedIn } from './pages/login/istheuserlogged'
import { setTokenStore } from './utils/settokenstore'

const app = new App()
app.run()
isTheUserLoggedIn()
setTokenStore()
alert(`Прошу проверить работу в четверг  во второй половине дня.\n
       На втором спринте нас покинул тим лид. \n 
       Это сильно подкосило нашу команду мы ни как не можем наверстать упущеное`)
