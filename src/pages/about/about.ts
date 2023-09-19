import { CSS_CLASSES } from '../../constants/cssclases'
import Page from '../../temlates/page'
import { createHtmlElement } from '../../utils/createelement'

class AboutPage extends Page {

  private createPerson(about: HTMLElement, img: string, name: string, role: string, bio: string, git: string) {
    const aboutPersonWrapper = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.aboutPersonWrapper]
    })
    about.append(aboutPersonWrapper);
    const aboutPerson = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.aboutPerson]
    })
    aboutPersonWrapper.append(aboutPerson);
    const personImg = createHtmlElement({
      tagName: 'img',
      cssClass: [CSS_CLASSES.personImg],
      srcAtribute: img,
      altAtribute: 'Person',
    })
    aboutPerson.append(personImg);
    const personName = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.personName],
      elementText: name
    })
    aboutPerson.append(personName);
    const personRole = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.personRole],
      elementText: role
    })
    aboutPerson.append(personRole);
    const personBio = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.personBio],
      elementText: bio
    })
    aboutPerson.append(personBio);
    const personGit = createHtmlElement({
      tagName: 'a',
      cssClass: [CSS_CLASSES.personGit],
      elementText: 'GitHub'
    })
    personGit.setAttribute('href', git);
    aboutPerson.append(personGit);
  }

  render() {
    const aboutWrapper = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.aboutWrapper]
    })
    this.container.append(aboutWrapper);
    const about = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.aboutPersons]
    })
    aboutWrapper.append(about);
    this.createPerson(about, 'images/MG_3935.jpg', 'Сергей', 'ИП', 'Программист', 'https://github.com/127zeppelin');
    this.createPerson(about, 'images/photo_2023.jpg', 'Анастасия Гладкая', 'Инженер по автоматизации', 'Программист', 'https://github.com/Gladkaay');

    const aboutText = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.aboutText],
      elementText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis viverra mattis. Etiam id urna at ipsum dictum rhoncus. Donec a lacinia nunc, at ullamcorper diam. Donec dictum nunc id pellentesque dignissim. Nam sapien lacus, maximus vitae elementum vitae, consectetur eu ante. Cras eget tempus eros. Nam cursus eleifend tellus, at gravida augue auctor vitae. Aenean ornare mi hendrerit elit viverra, eget rutrum nisi vulputate. Sed auctor aliquam luctus. Morbi dui magna, pellentesque sed tristique ac, aliquam et lectus. Nam dapibus non dui non hendrerit. Sed euismod mauris et pretium blandit. Mauris suscipit hendrerit nibh vitae viverra. Nunc sit amet quam vel ligula molestie semper. Curabitur sollicitudin non sem rutrum lacinia.'
    })
    aboutWrapper.append(aboutText);

    const aboutLogo = createHtmlElement({
      tagName: 'a',
      cssClass: [CSS_CLASSES.aboutLogo],
      elementHtml: '<img src="images/logo_rsschool3_negate.png" alt="RS School">'
    })
    aboutLogo.setAttribute('href', 'https://rs.school');
    aboutWrapper.append(aboutLogo);


    return this.container
  }
}

export default AboutPage
