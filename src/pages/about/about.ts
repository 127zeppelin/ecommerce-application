import { CSS_CLASSES } from '../../constants/cssClases'
import Page from '../../temlates/page'
import { createEl } from '../../utils/createElement'

class AboutPage extends Page {

  private createPerson(about: HTMLElement, img: string, name: string, profession:
  string, bio: string, role: string, git: string) {
    const aboutPersonWrapper = createEl('div', [CSS_CLASSES.aboutPersonWrapper])
    about.append(aboutPersonWrapper);
    const aboutPerson = createEl('div', [CSS_CLASSES.aboutPerson])
    aboutPersonWrapper.append(aboutPerson);

    const personImg = createEl('img', [CSS_CLASSES.personImg], undefined, [img, 'Person'])
    aboutPerson.append(personImg);

    const personName = createEl('div', [CSS_CLASSES.personName], name)
    aboutPerson.append(personName);

    const personProfession = createEl('div', [CSS_CLASSES.personRole], profession)
    aboutPerson.append(personProfession);

    const personBio = createEl('div', [CSS_CLASSES.personBio], bio)
    aboutPerson.append(personBio);

    const personRole = createEl('div', [CSS_CLASSES.personRole], role)
    aboutPerson.append(personRole);

    const personGit = createEl('a', [CSS_CLASSES.personGit], 'GitHub', [git])
    aboutPerson.append(personGit);
  }

  render() {
    const aboutWrapper = createEl('div', [CSS_CLASSES.aboutWrapper])
    this.container.append(aboutWrapper);

    const title = createEl('h1', [CSS_CLASSES.pageTitle], 'About Us')
    aboutWrapper.append(title)

    const about = createEl('div', [CSS_CLASSES.aboutPersons])
    aboutWrapper.append(about);
    this.createPerson(about, 'images/MG_3935.jpg', 'Siarhey Shcharbitski',
      'Workplace: Sole proprietor', 'Profession: Programmer', 'Team role: Power behind the throne',
      'https://github.com/127zeppelin');
    this.createPerson(about, 'images/photo_2023.jpg', 'Anastasia Gladkaya',
      'Workplace: Automation Engineer.', 'Profession: Programmer', 'Team Role: Acting Team Lead',
      'https://github.com/Gladkaay');

    const content = `<p>Our team started working on the task without any major issues. 
      Timur (Team Lead) set up the repository. Sergey configured the API for commercial 
      tools and created a repository. We chose the theme of luxury car rentals. 
      The purpose of the application is for the user to view the available cars on the catalog page, 
      filter them by categories and color, sort them by name and price, and access additional 
      information about a car by entering the product page.</p>

      <p>Unfortunately, in the second sprint, after Anastasia created the basic structure of our project, 
      Timur decided to leave the team. He mentioned that the project was complex, 
      and he lacked the knowledge and time to delve into it. Subsequent work was carried 
      out by Nastya and Sergey as a duo. We ran out of time to complete the second sprint 
      and had to finish it during the third sprint. The third sprint extended into the fourth, 
      which took time away from the fourth sprint and ultimately affected the assessment for 
      each of the three sprints. As a result, some features remained unimplemented, such as 
      a pop-up window when clicking on a photo and editing user information on the user page or writing tests.</p>`

    const aboutText = createEl('div', [CSS_CLASSES.aboutText], content)
    aboutWrapper.append(aboutText);
    
    const rsSchoolLogo = '<img src="images/logo_rsschool3_negate.png" alt="RS School">'
    const aboutLogo = createEl('a', [CSS_CLASSES.aboutLogo], rsSchoolLogo, ['https://rs.school'])

    aboutWrapper.append(aboutLogo);

    return this.container
  }
}

export default AboutPage
