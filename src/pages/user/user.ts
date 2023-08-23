import Page from "../../temlates/page";

class CustomerPage extends Page{
  

  // constructor(id: string) {
  //   super(id);
  // }

  render() {
    const containerOuter = document.createElement("div");
    containerOuter.className = "container";
    this.container.append(containerOuter);
    const title = this.createHeaderTitle("User Page");
    title.className = 'pade-title';
    containerOuter.append(title);
    return this.container;
  }
}

export default CustomerPage;
