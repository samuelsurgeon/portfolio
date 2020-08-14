enableContactTicker();
enableInformationSlideout();
enableDraggableProjects(['#wv', '#hearth', '#sav']);

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
