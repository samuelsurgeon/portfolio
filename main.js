enableContactTicker();
enableInformationSlideout();

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
