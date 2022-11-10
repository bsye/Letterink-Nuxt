import Vue from "vue";
import get from 'lodash.get';
import Toasted from 'vue-toasted';

Vue.use(Toasted);

function getStyleTransformValues(el) {
  var transform = window
    .getComputedStyle(el, null)
    .getPropertyValue("-webkit-transform");
  var results = transform.match(
    /matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}.+))(?:, (-{0,1}.+))\))/
  );

  if (!results) return [0, 0, 0];
  if (results[1] == "3d") return results.slice(2, 5);

  results.push(0);
  return results.slice(5, 8);
}

function isElementCentered(element) {
  const width = window.innerWidth / 2;
  const left = element.getBoundingClientRect().left;
  const right = element.getBoundingClientRect().right;

  if (
    width % right >= element.offsetWidth &
    width % left <= element.offsetWidth &
    left % right >= element.offsetWidth
  ) {
    return true
  } else {
    return false
  }
}

function mobileFullScreen() {
  const appHeight = () => {
    if (window.innerWidth >= 768) return
    const doc = document.documentElement;
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  appHeight()
  window.addEventListener("resize", appHeight);
}


export default ({ app }, inject) => {
  inject('get', get);
  inject("getStyleTransformValues", getStyleTransformValues);
  inject("isElementCentered", isElementCentered);
  inject("mobileFullScreen", mobileFullScreen);
}