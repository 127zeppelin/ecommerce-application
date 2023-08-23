import Page from "../../temlates/page";

class CarsPage extends Page{
  

  // constructor(id: string) {
  //   super(id);
  // }

  render() {
    const containerOuter = document.createElement("div");
    containerOuter.className = "container";
    this.container.append(containerOuter);
    const title = this.createHeaderTitle("Our Cars");
    title.className = 'pade-title';
    containerOuter.append(title);
    return this.container;
  }
}

export default CarsPage;
