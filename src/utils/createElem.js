export default function createElem({
  tag,
  classList,
  attrs,
  value,
  onclick
} = {}) {
  let elem;

  if (tag === "svg")
    elem = document.createElementNS("http://www.w3.org/2000/svg", tag);
  else elem = document.createElement(tag);

  for (let key in attrs) {
    elem.setAttribute(key, attrs[key]);
  }
  if (classList) {
    if (classList instanceof Array) {
      classList.forEach(className => {
        elem.classList.add(className);
      });
    } else {
      elem.classList.add(classList);
    }
  }

  if (value) {
    elem.innerHTML = value;
  }
  if (onclick) {
    elem.addEventListener("click", onclick);
  }
  return elem;
}
