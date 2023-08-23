import App from "./pages/app/app";
import "./style.css";
import { isTheUserLoggedIn } from "./pages/login/istheuserlogged";

const app = new App();
app.run();
alert("Привет! Нашу многострадальную команду бросил тим лид, мы доделываем из последних сил проверьте в четверг");
isTheUserLoggedIn(); 