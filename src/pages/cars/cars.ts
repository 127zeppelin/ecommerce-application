import Page from "../../temlates/page";

class CarsPage extends Page{
  

  // constructor(id: string) {
  //   super(id);
  // }

  render() {
    const title = this.createHeaderTitle("Our Cars");
    this.container.append(title);
    return this.container;
  }
}

export default CarsPage;
