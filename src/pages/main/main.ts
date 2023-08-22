import Page from "../../temlates/page";

class MainPage extends Page{

  // constructor(id: string) {
  //   super(id);
  // }

  render() {
    const title = this.createHeaderTitle("Main");
    this.container.append(title);
    return this.container;
  }
}

export default MainPage;
