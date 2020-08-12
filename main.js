enableContactTicker();
enableInformationSlideout();
enableDraggableProjects(document.querySelector('.project-article'));

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

function enableDraggableProjects(element) {
  // May throw error before of formatting
  let positionOne = 0, 
      positionTwo = 0, 
      positionThree = 0, 
      positionFour = 0;

  if (document.querySelector(element.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
