//import { ErrorTypes } from "../../Enums/ErrorTypes";
import Page from '../../temlates/page'

class ErrorPage extends Page {
  //private errorType: ErrorTypes | string;

  TextObject: { [prop: string]: string } = {
    '404': 'Error! The page was not found.',
  }

  /*
  constructor(id: string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }
*/
  render() {
    const containerOuter = document.createElement('div')
    containerOuter.className = 'container'
    this.container.append(containerOuter)
    const title = this.createHeaderTitle('404')
    title.className = 'pade-title'
    containerOuter.append(title)
    return this.container
  }
}

export default ErrorPage
