import Page from "../../temlates/page";

class CustomerPage extends Page{
  

  // constructor(id: string) {
  //   super(id);
  // }

  render() {
    const title = this.createHeaderTitle("User Page");
    this.container.append(title);
    return this.container;
  }
}

export default CustomerPage;
