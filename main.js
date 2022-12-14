let itemClassName = 'carousel-article';
let items = document.querySelectorAll(`.${itemClassName}`);
let totalItems = items.length;
let slide = 0;
let moving = true;
let projectLinks = ['https://samuelsurgeon.github.io/weather-visualiser/', 'https://hearth-prototype.web.app/', 'https://samuelsurgeon.github.io/sorting-visualiser/'];

enableContactTicker();
enableInformationSlideout();
initCarousel();
//enableDraggableProjects(['#wv', '#hearth', '#sav']);

function initCarousel() {
  setInitialClasses();
  setEventListeners();

  let link = document.querySelectorAll('.link-target');
  link.forEach(element => element.href = projectLinks[0]);
  projectLinks.push(projectLinks.shift());

  moving = false;
}

function setInitialClasses() {
  items[totalItems - 1].classList.add('prev');
  items[0].classList.add('active');
  items[1].classList.add('next');
}

function setEventListeners() {
  let next = document.querySelector('.carousel-button-next');
  let prev = document.querySelector('.carousel-button-prev');
  let link = document.querySelectorAll('.link');

  next.addEventListener('click', moveNext);
  prev.addEventListener('click', movePrev);
  link.forEach(element => element.addEventListener('mouseover', addUnderlineLink));
  link.forEach(element => element.addEventListener('mouseout', removeUnderlineLink));
}

function addUnderlineLink() {
  let link = document.querySelectorAll('.link');
  link.forEach(element => element.style.textDecoration = 'underline');
}

function removeUnderlineLink() {
  let link = document.querySelectorAll('.link');
  link.forEach(element => element.style.textDecoration = 'none');
}

function moveNext() {
  if (!moving) {
    let link = document.querySelectorAll('.link-target');
    link.forEach(element => element.href = projectLinks[0]);
    projectLinks.push(projectLinks.shift());

    if (slide === (totalItems - 1)) {
      slide = 0;
    } else {
      slide++;
    }

    moveCarouselTo(slide);
  }
}

function movePrev() {
  if (!moving) {
    let link = document.querySelectorAll('.link-target');
    link.forEach(element => element.href = projectLinks[1]);
    projectLinks.unshift(projectLinks.pop());

    if (slide === 0) {
      slide = (totalItems - 1);
    } else {
      slide--;
    }

    moveCarouselTo(slide);
  }
}

function disableInteraction() {
  moving = true;

  setTimeout(function() {
    moving = false;
  }, 500);
}

function moveCarouselTo(slide) {
  if (!moving) {
    disableInteraction();

    let newPrevious = slide - 1,
        newNext = slide + 1,
        oldPrevious = slide - 2,
        oldNext = slide + 2;

    if (totalItems > 3) {
      if (newPrevious <= 0) {
        oldPrevious = (totalItems - 1);
      } else if (newNext >= (totalItems - 1)) {
        oldNext = 0;
      }

      if (slide === 0) {
        newPrevious = (totalItems - 1);
        oldPrevious = (totalItems - 2);
        oldNext = (slide + 1);
      } else if (slide === (totalItems - 1)) {
        newPrevious = (slide - 1);
        newNext = 0;
        oldNext = 1;
      }
      
      items[oldPrevious].className = itemClassName;
      items[oldNext].className = itemClassName;

      items[newPrevious].className = itemClassName + ' prev';
      items[slide].className = itemClassName + ' active';
      items[newNext].className = itemClassName + ' next';
    }
  }
}

function enableContactTicker() {
  window.addEventListener('load', () => {
    function go() {
      i = i < width ? i + step : 1;
      scrollBarElement.style.marginLeft = -i + 'px';
    }
    let i = 0;
    let step = 1;
    let space = '&nbsp;&nbsp;';

    let scrollBarElement = document.querySelector('.scroll-bar-element');
    let text = scrollBarElement.innerHTML;
    scrollBarElement.innerHTML = text + space;
    scrollBarElement.style.position = 'absolute';
    let width = (scrollBarElement.clientWidth + 1);
    scrollBarElement.style.position = '';
    scrollBarElement.innerHTML = text + space + text + space + text + space + text + space + text + space + text + space + text + space;
    let scrollBarSection = document.querySelector('.scroll-bar-section');
    scrollBarSection.addEventListener('mouseenter', () => {
      step = 0;
    }, true);
    scrollBarSection.addEventListener('mouseleave', () => {
      step = 1;
    }, true);
    let x = setInterval(go, 50);
  }, true);
}

function enableInformationSlideout() {
  let informationButton = document.querySelector('.landing-information-button');
  informationButton.addEventListener('click', () => {
    let carouselWrapper = document.querySelector('.carousel-wrapper');
    let informationText = document.querySelector('.landing-information-text');
    let next = document.querySelector('.carousel-button-next');
    let prev = document.querySelector('.carousel-button-prev');

    if (informationText.style.maxHeight) {
      next.style.display = 'block';
      prev.style.display = 'block';

      carouselWrapper.style.opacity = 1;
      informationText.style.maxHeight = null;
    } else {
      next.style.display = 'none';
      prev.style.display = 'none';

      carouselWrapper.style.opacity = 0.025;
      informationText.style.maxHeight = informationText.scrollHeight + 'px';
    }
    // DO THIS IN CSS carouselWrapper.style.transition = '.5s';
  });
}

/*
function enableDraggableProjects(projectIDsArray) {
  projectIDsArray.forEach(ID => {
    let element = document.querySelector(ID);
    // May throw error before of formatting
    let positionOne = 0, 
        positionTwo = 0, 
        positionThree = 0, 
        positionFour = 0;

    element.onmousedown = dragMouseDown;

    function dragMouseDown() {
      let e = window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      positionThree = e.clientX;
      positionFour = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag() {
      let e = window.event;
      e.preventDefault();
      // calculate the new cursor position:
      positionOne = positionThree - e.clientX;
      positionTwo = positionFour - e.clientY;
      positionThree = e.clientX;
      positionFour = e.clientY;
      // set the element's new position:
      element.style.top = (element.offsetTop - positionTwo) + "px";
      element.style.left = (element.offsetLeft - positionOne) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  });
}
*/
