import { ErrorTypes } from "../../Enums/ErrorTypes";
import Page from "../../temlates/page";


class ErrorPage extends Page {
  private errorType: ErrorTypes | string;

  TextObject: { [prop: string]: string } = {
    "404": "Error! The page was not found.",
  };

  constructor(id: string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }

  render() {
    const title = this.createHeaderTitle(this.TextObject[this.errorType]);
    this.container.append(title);
    return this.container;
  }
}

export default ErrorPage;
