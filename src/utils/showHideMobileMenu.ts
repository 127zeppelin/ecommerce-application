import { CSS_CLASSES } from "../constants/cssClases";

export const showAndHideMobileMenu = () => {
  const pageLinks: HTMLElement | null = document.querySelector(`.${[CSS_CLASSES.menuWrapper]}`);
  if (pageLinks) {
    pageLinks.classList.toggle('active');
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }
}

