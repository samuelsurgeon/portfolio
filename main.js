let itemClassName = 'carousel-article';
let items = document.querySelectorAll(`.${itemClassName}`);
let totalItems = items.length;
let slide = 0;
let moving = true;

enableContactTicker();
enableInformationSlideout();
initCarousel();
//enableDraggableProjects(['#wv', '#hearth', '#sav']);

function initCarousel() {
  setInitialClasses();
  setEventListeners();

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

  next.addEventListener('click', moveNext);
  prev.addEventListener('click', movePrev);
}

function moveNext() {
  if (!moving) {
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
      
      console.log(items[oldPrevious].className);
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
    let informationText = document.querySelector('.landing-information-text');
    informationText.style.maxHeight ? informationText.style.maxHeight = null : informationText.style.maxHeight = informationText.scrollHeight + 'px';
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
